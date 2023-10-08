from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from pydantic import BaseModel
import datetime
import random
import string 
from web3 import Web3
from solcx import compile_standard, install_solc
import json

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database configuration
DATABASE_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'blockmania'
}

@app.get("/items/")
def read_items(type: str):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)
    if (type=="All"):
        cursor.execute("SELECT * FROM assets")
  
    else:
        cursor.execute("SELECT * FROM assets where category=%s", (type,))
    items = cursor.fetchall()
    cursor.close()
    connection.close()
    return items

@app.post("/checkout/")
def checkout(cart: list[dict], user_id: int, total_price: float):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)

    # First, fetch the user's balance
    cursor.execute("SELECT balance FROM users WHERE id = %s", (user_id,))
    balance_row = cursor.fetchone()
    if not balance_row:
        raise HTTPException(status_code=400, detail="User not found")
    balance = balance_row['balance']

    # Generate hash and current date
    hash_val = ''.join(random.choice(string.digits) for _ in range(6))
    received_date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if balance < total_price:
        for item in cart:
            cursor.execute(
                "INSERT INTO transactions (user_id, image_url, product_name, hash, total, received, status) VALUES (%s, %s, %s, %s, %s, %s, 'Denied')",
                (user_id, item["image_url"], item["name"], hash_val, item["current_price"], received_date)
            )
        connection.commit()
        cursor.close()
        connection.close()    
        return {"status": "denied", "message": "Insufficient Funds"}

    else:
        for item in cart:
            cursor.execute(
                "INSERT INTO transactions (user_id, image_url, product_name, hash, total, received, status) VALUES (%s, %s, %s, %s, %s, %s, 'Pending')",
                (user_id, item["image_url"], item["name"], hash_val, item["current_price"], received_date)
            )
        cursor.execute("UPDATE users SET balance = balance - %s WHERE id = %s", (total_price, user_id))
        connection.commit()
        cursor.close()
        connection.close()
        
        try:
            # type your address here
            w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
            # Default is 1337 or with the PORT in your Gaanche
            chain_id = 1337
            # Find in you account
            my_address = "0x1dffB49eF25C3fef1f11C720aF0f824E9554e842"
            # Find in you account
            private_key = "0xc9bbfd52dbf55266688c65aa4091d47cfc30451e5cd24fe10fe8afbcabdbfae1"
            
            with open("DAppStorage.sol", "r") as file:
                simple_storage_file = file.read()
                
            install_solc("0.6.0")
            compiled_sol = compile_standard(
                {
                    "language": "Solidity",
                    "sources": {"DAppStorage.sol": {"content": simple_storage_file}},
                    "settings": {
                        "outputSelection": {
                            "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                        }
                    },
                },
                solc_version="0.6.0",
            )

            with open("compiled_code.json", "w") as file:
                json.dump(compiled_sol, file)
                
            # get bytecode
            bytecode = compiled_sol["contracts"]["DAppStorage.sol"]["DAppStorage"]["evm"][
                "bytecode"
            ]["object"]

            # get abi
            abi = compiled_sol["contracts"]["DAppStorage.sol"]["DAppStorage"]["abi"]

            DAppStorage = w3.eth.contract(abi=abi, bytecode=bytecode)

            nonce = w3.eth.get_transaction_count(my_address)
                        
            transaction = DAppStorage.constructor().build_transaction(
                {
                    "chainId": chain_id,
                    "gasPrice": w3.eth.gas_price,
                    "from": my_address,
                    "nonce": nonce
                }
            )
            
            signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
            tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

            simple_storage = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)

            store_transaction = simple_storage.functions.addTransaction(my_address, 1, int(total_price)).build_transaction(
                {
                    "chainId": chain_id,
                    "gasPrice": w3.eth.gas_price,
                    "from": my_address,
                    "nonce": nonce + 1
                }
            )

            signed_store_txn = w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
            send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
            tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)
            
            return {"status": "success", "message": "Checkout completed " + str(tx_receipt)}

        except Exception as e:
            return {"status": "failed", "message": str(e)}

  
class LoginData(BaseModel):
    username: str
    password: str

@app.post("/login/")
def login(data: LoginData):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (data.username, data.password))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    return {"status": "success", "message": "Logged in successfully", "user_id": user["id"]}
class RegisterData(BaseModel):
    username: str
    password: str


@app.post("/register/")
def register(data: RegisterData):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)

    # Check if the user already exists
    cursor.execute("SELECT * FROM users WHERE email=%s", (data.username,))
    user = cursor.fetchone()

    if user:
        cursor.close()
        connection.close()
        raise HTTPException(status_code=400, detail="Username already registered")

    # If the user doesn't exist, then insert a new user
    cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (data.username, data.password))
    connection.commit()
    user_id = cursor.lastrowid
    cursor.close()
    connection.close()

    return {"status": "success", "message": "Registered successfully", "user_id": user_id}    

@app.get("/transactions/")
def read_transactions():
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM transactions")
    transactions = cursor.fetchall()
    cursor.close()
    connection.close()
    return transactions

@app.get("/myuser/{id}")
def user(id: str):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    return user

class UserData(BaseModel):
    balance: str
    address: str
    user: str

@app.post("/connect")
def user(data: UserData):
    try:
      
        connection = mysql.connector.connect(**DATABASE_CONFIG)
        cursor = connection.cursor(dictionary=True)
        
        # Update query with the correct placeholders for MySQL
        cursor.execute("UPDATE users SET balance = %s, address = %s WHERE id = %s", (data.balance, data.address, data.user))
        
        # Commit the transaction
        connection.commit()
        
        # Close the cursor and connection
        cursor.close()
        connection.close()
        
        return {"status": "success", "message": "User details updated successfully"}
    except mysql.connector.Error as err:
        # It's important to handle exceptions and provide feedback
        return {"status": "error", "message": str(err)}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

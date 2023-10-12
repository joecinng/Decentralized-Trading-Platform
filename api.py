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
        connection.commit()
        cursor.close()
        connection.close()    
        return {"status": "denied", "message": "Insufficient Funds"}

    else:
        for item in cart:
            cursor.execute(
                "INSERT INTO transactions (user_id, asset_id, hash, received, status) VALUES (%s, %s, %s, %s, 'Pending')",
                (user_id, item["id"], hash_val, received_date)
            )
        cursor.execute("UPDATE users SET balance = balance - %s WHERE id = %s", (total_price, user_id))
        connection.commit()
        cursor.close()
        connection.close()

        return {"status": "success", "message": "Checkout completed"}

  
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
        return {"status": "error", "message": "Incorrect email or password"}
    
    return {"status": "success", "message": "Logged in successfully", "user_id": user["id"]}

class RegisterData(BaseModel):
    username: str
    password: str

@app.post("/register/")
def register(data: RegisterData):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)

    try:
        # Check if the user already exists
        cursor.execute("SELECT * FROM users WHERE email=%s", (data.username,))
        user = cursor.fetchone()

        if user:
            return {"status": "error", "message": "Email already registered"}

        # If the user doesn't exist, then insert a new user
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (data.username, data.password))
        connection.commit()
        user_id = cursor.lastrowid

        return {"status": "success", "message": "Registered successfully", "user_id": user_id}

    except mysql.connector.Error as err:
        # Handle database errors
        connection.rollback()
        return {"status": "error", "message": "Database error", "user_id": user_id}

    finally:
        cursor.close()
        connection.close()  

@app.get("/transactions/")
def read_transactions():
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT t.*, a.image_url, a.name, a.current_price
        FROM transactions AS t
        JOIN assets AS a 
        ON t.asset_id = a.id
        ORDER BY t.received
    """)
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

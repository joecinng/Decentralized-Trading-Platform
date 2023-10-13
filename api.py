# Team 47: BlockMania 
#   Stefan Ralph Kumarasinghe (103804645)
#   Joe Cin NG (102765534)
#   Miran Abeyewardene (103824193) 
    
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from pydantic import BaseModel
import datetime
import random
import string 

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

class RegisterData(BaseModel):
    username: str
    password: str
    
class UserData(BaseModel):
    balance: str
    address: str
    user: str
    
class LoginData(BaseModel):
    username: str
    password: str
    
# Login API:
#   It makes a login request by passing the email and password and authenticate the user. 
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
    else:
        return {"status": "success", "message": "Logged in successfully", "user_id": user["id"]}

# Register API:
#   It makes a register request by passing the email and password and creating a record in the database with the user. 
@app.post("/register/")
def register(data: RegisterData):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)
    # Check if the user already exists
    cursor.execute("SELECT * FROM users WHERE email=%s", (data.username,))
    user = cursor.fetchone()
    if user:
        return {"status": "error", "message": "Email already registered"}
    else:       
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (data.username, data.password))
        connection.commit()
        user_id = cursor.lastrowid
        cursor.close()
        connection.close
        return {"status": "success", "message": "Registered successfully", "user_id": user_id}
        
# Read Item API:
#   Retrieve all the assets from the local database based on the category parameter.
@app.get("/items/")
def read_items(type: str):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)
    if (type=="All"):
        cursor.execute("SELECT * FROM assets WHERE availability = 1")
    else:
        cursor.execute("SELECT * FROM assets WHERE category=%s AND availability = 1", (type,))
    items = cursor.fetchall()
    cursor.close()
    connection.close()
    if not items:
        return {"status": "error", "message": "No items found"}
    return items

# Read Transactions API:
#   Retrive the user's transaction histories based on the userID
@app.get("/transactions/")
def read_transactions(userId: int):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)
    if (userId == 0) :
        cursor.execute("""
            SELECT t.*, a.image_url, a.name, a.current_price
            FROM transactions AS t
            JOIN assets AS a 
            ON t.asset_id = a.id
            ORDER BY t.received
        """)
    else:
        cursor.execute("""
            SELECT t.*, a.image_url, a.name, a.current_price
            FROM transactions AS t
            JOIN assets AS a 
            ON t.asset_id = a.id
            WHERE t.user_id = %s
            ORDER BY t.received
        """, (userId,))
    transactions = cursor.fetchall()
    cursor.close()
    connection.close()
    if not transactions:
        return {"status": "error", "message": "No transactions found"}
    return transactions

# Checkout API:
#   Checkout the order with the cart, user id and total price. 
@app.post("/checkout/")
def checkout(cart: list[dict], user_id: int, total_price: float):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)

    # get user balance
    cursor.execute("SELECT balance FROM users WHERE id = %s", (user_id,))
    balance_row = cursor.fetchone()
    if not balance_row:
        return {"status": "error", "message": "User not found"}
    balance = balance_row['balance']

    hash_val = ''.join(random.choice(string.digits) for _ in range(6))
    received_date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if balance < total_price:
        connection.commit()
        cursor.close()
        connection.close()    
        return {"status": "error", "message": "Insufficient Funds"}
    else:
        for item in cart:
            cursor.execute(
                "INSERT INTO transactions (user_id, asset_id, hash, received, status) VALUES (%s, %s, %s, %s, 'Pending')",
                (user_id, item["id"], hash_val, received_date)
            )
            item_id = int(item["id"])
            cursor.execute("UPDATE assets SET availability = false WHERE id = %s", (item_id,))
        cursor.execute("UPDATE users SET balance = balance - %s WHERE id = %s", (total_price, user_id))
        connection.commit()
        cursor.close()
        connection.close()
        return {"status": "success", "message": "Checkout completed"}

# Connect API:
#   Connect the wallet by updating the wallet information to the users table. 
@app.post("/connect")
def connect(data: UserData):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)
    # check users
    cursor.execute("SELECT id FROM users WHERE id = %s", (data.user,))
    user = cursor.fetchone()
    if not user:
        return {"status": "error", "message": "User not found"}
    cursor.execute("UPDATE users SET balance = %s, address = %s WHERE id = %s", (data.balance, data.address, data.user))
    connection.commit()
    cursor.close()
    connection.close()
    return {"status": "success", "message": "User details updated successfully"}
    
# User API:
#   Retrieve the user's information from database using user id
@app.get("/myuser/{id}")
def user(id: str):
    connection = mysql.connector.connect(**DATABASE_CONFIG)
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
    user = cursor.fetchone()
    if not user:
        return {"status": "error", "message": "User not found"}
    cursor.close()
    connection.close()
    return user

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

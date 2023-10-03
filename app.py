from flask import Flask, render_template
import requests

app = Flask(__name__)

API_URL = "http://127.0.0.1:8000/items/"  # URL for FastAPI endpoint

@app.route('/')
def index():
    response = requests.get(API_URL)
    items = response.json()
    return render_template('index.html', items=items)

if __name__ == '__main__':
    app.run(port=5000)

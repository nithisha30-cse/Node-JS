
import sqlite3

# Create database and table
conn = sqlite3.connect('cart.db')
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS cart
               (id INTEGER PRIMARY KEY AUTOINCREMENT,
                item TEXT NOT NULL,
                price REAL NOT NULL)''')
conn.commit()
conn.close()

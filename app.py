from flask import Flask, render_template, request

app = Flask(__name__)
cart = []  # local state for storing items

@app.route('/')
def home():
    return render_template('index.html', cart=cart)

@app.route('/add', methods=['POST'])
def add_item():
    item = request.form['item']
    price = request.form['price']
    cart.append({'item': item, 'price': price})
    return render_template('index.html', cart=cart)

if __name__ == '__main__':
    app.run(debug=True)

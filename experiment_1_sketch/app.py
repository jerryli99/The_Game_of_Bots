from flask import Flask, render_template, jsonify
import time
app = Flask(__name__, template_folder='templates')

# Function see if i can update numbers
def add(n):
    return (n+1)%10

@app.route('/')
def index():
    
    block_data = [
        {"x": 50, "y": 50, "color": "red"},
        {"x": 100, "y": 30, "color": "blue"},
    ]
    return render_template('index.html', block_data=block_data)

@app.route('/get_time')
def get_time():
    current_time = time.strftime("%H:%M:%S")
    return jsonify(time=current_time)


@app.route('/number/<int:n>')
def calculate(n):
    number = add(n)
    return jsonify(number=number)

if __name__ == '__main__':
    app.run(debug=True)

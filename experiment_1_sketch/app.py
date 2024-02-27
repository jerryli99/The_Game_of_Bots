from flask import Flask, send_from_directory, render_template, request, jsonify
import time
app = Flask(__name__, template_folder='templates')


# Route to serve static files (e.g., images)
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/u1')
def index():
    block_data = [
        {"x": 50, "y": 50, "color": "red"},
        {"x": 100, "y": 30, "color": "blue"},
    ]
    return render_template('u1_index.html', block_data=block_data)


@app.route('/get_time')
def get_time():
    current_time = time.strftime("%H:%M:%S")
    return jsonify(time=current_time)


@app.route('/get_updated_loc')
def get_updated_loc():
    #so now I just need to call some kind of location calculation function here to update blockdata to update
    block_data = [
        {"x": 66, "y": 50, "color": "red"},
        {"x": 100, "y": 30, "color": "blue"}
    ]
    return block_data


@app.route('/handle_collision', methods=['POST'])
def handle_collision():
    data = request.json
    collision_message = data.get('message', 'No collision message received.')
    collision_coordinates = data.get('coordinates', {})
    print('Collision Message:', collision_message)
    print('Collision coordinates:', collision_coordinates[0])

    if collision_coordinates[0] >= 20 and collision_coordinates[1] >= 0:
        # Add collision handling logic here
        update_block = [
            {"x": "left"}
        ]
    elif collision_coordinates[1] < 13:
        update_block = [
            {"x": "down"}
        ]
    else:
        update_block = [
            {"x": "left"}
        ]

    return jsonify(update_block)






if __name__ == '__main__':
    app.run(debug=True)




# # Function see if i can update numbers
# def add(n):
#     #n = n + 1
#     return n+9
# @app.route('/number/<int:n>')
# def calculate(n):
#     number = add(n) 
#     return jsonify(number=number)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cellSize = 40; // Size of each cell in the grid
const rows = canvas.height / cellSize;
const columns = canvas.width / cellSize;

let squareX = 0;
let squareY = 0;

// Create a 2D array to represent the grid with obstacles
const grid = Array.from({ length: rows }, () => Array(columns).fill(0));
console.log(grid);

// Add some obstacles (block cells)
grid[2][3] = 1;
grid[4][5] = 1;
grid[6][7] = 1;
grid[2][2] = 1;
grid[4][6] = 1;
grid[7][7] = 1;
grid[10][2] = 1;
grid[12][6] = 1;
grid[10][7] = 1;
grid[5][12] = 1;
grid[7][15] = 1;
grid[4][17] = 1;
grid[8][16] = 1;
grid[0][0] = 1;
grid[12][10] = 2;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "#ddd";

    // Draw vertical lines
    for (let i = 0; i <= canvas.width; i += cellSize) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
    }

    // Draw horizontal lines
    for (let j = 0; j <= canvas.height; j += cellSize) {
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
    }

    ctx.stroke();
}

function drawSquare() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(squareX * cellSize, squareY * cellSize, cellSize, cellSize);
}

function drawObstacles() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (grid[i][j] === 1) {
                ctx.fillStyle = "black";
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
            
            if (grid[i][j] === 2) {
                ctx.fillStyle = "pink";
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }//
}

function start() {
    console.log("Start button clicked");
    alert("hello")
}

function end() {
    console.log("End button clicked");
    alert("hello")
}

function stop() {
    console.log("Stop button clicked");
    alert("hello")
}

function moveSquare(direction) {
    let newX = squareX;
    let newY = squareY;

    switch (direction) {
        case "up":
            newY = squareY - 1;
            break;
        case "down":
            newY = squareY + 1;
            break;
        case "left":
            newX = squareX - 1;
            break;
        case "right":
            newX = squareX + 1;
            break;
        case "none":
            newX = newX;
            newY = newY;
            break;
    }

    // Code need logic improvement
    //-------------------------------------------------------------------------------------------
    // Check for collision with obstacles
    if (newX >= 0 && newX < columns && newY >= 0 && newY < rows && grid[newY][newX] !== 1) {
        squareX = newX;
        squareY = newY;
        drawGrid();
        drawObstacles();
        drawSquare();
        //console.log([squareX, squareY]);
    } else {
        console.log("collide :(");
          // Send collision message to Flask backend
          fetch('/handle_collision', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message: 'Collision detected!',
                coordinates: [newX, newY] //sned the current location of colliding with obstacle to server
            }),
        })
        .then(response => response.json())
        .then(update_block => {
            //console.log(update_block); // Optional: Log response from backend
            //need to change this code/....
            moveSquare(update_block[0].x);
        })
        .catch(error => console.error('Error handling collision:', error));
    }
    //----------------------------------------------------------------------------------------------
}


//just for testing
document.addEventListener("keydown", function (event) {
    switch (event.key) {
    case "ArrowUp":
        moveSquare("up");
        break;
    case "ArrowDown":
        moveSquare("down");
        break;
    case "ArrowLeft":
        moveSquare("left");
        break;
    case "ArrowRight":
        moveSquare("right");
        break;
    }
});

function updateBlockData() {
    fetch('/get_updated_loc')
        .then(response => response.json())
        .then(data => {
            //console.log(data); // For debugging
            // Update canvas with new block data (add drawing logic here)

            if (data[0].x > 0) moveSquare("right");
        })
        .catch(error => console.error('Error fetching block data:', error));
}

//I might need to reorganize the code, seperate them into different files. I will do it another time.
//get and post methods + interpreting json + convert json to movement for the agents.
//console.log(blockData);


// Initial draw
drawGrid();
drawObstacles();
drawSquare();
console.log("hello")


// Periodically update block data every second
setInterval(updateBlockData, 1000);
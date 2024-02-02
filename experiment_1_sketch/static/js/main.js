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
    }
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
    }

    // Check for collision with obstacles
    if (newX >= 0 && newX < columns && newY >= 0 && newY < rows && grid[newY][newX] !== 1) {
        squareX = newX;
        squareY = newY;
        drawGrid();
        drawObstacles();
        drawSquare();
    } else {
        console.log("collide :(");
    }
}

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

// Initial draw
drawGrid();
drawObstacles();
drawSquare();
console.log("hello")
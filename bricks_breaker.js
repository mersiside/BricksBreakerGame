var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Ball variables
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

// Paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

// Brick variables
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(var r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

// Score variables
var score = 0;

// Lives variables
var lives = 3;

// Event listeners for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
	for(var c=0; c<brickColumnCount; c++) {
		for(var r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 
    canvas.width-80, 20);
}

function drawLives() {
ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Lives: "+lives, 20, 20);
}

function collisionDetection() {
for(var c=0; c<brickColumnCount; c++) {
for(var r=0; r<brickRowCount; r++) {
var b = bricks[c][r];
if(b.status == 1) {
if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
dy = -dy;
b.status = 0;
score++;
if(score == brickRowCount*brickColumnCount) {
alert("Congratulations! You Win!");
document.location.reload();
}
}
}
}
}
}

function draw() {
// Clear the canvas before drawing on it
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw the ball, paddle, bricks, score, and lives
drawBall();
drawPaddle();
drawBricks();
drawScore();
drawLives();

// Collision detection
collisionDetection();

// Bounce the ball off the walls
if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
	dx = -dx;
}
if(y + dy < ballRadius) {
	dy = -dy;
} else if(y + dy > canvas.height-ballRadius) {
	if(x > paddleX && x < paddleX + paddleWidth) {
		dy = -dy;
	}
	else {
		lives--;
		if(!lives) {
			alert("Game Over");
			document.location.reload();
		}
		else {
			x = canvas.width/2;
			y = canvas.height-30;
			dx = 2;
			dy = -2;
			paddleX = (canvas.width-paddleWidth)/2;
		}
	}
}

// Move the paddle left or right
if(rightPressed && paddleX < canvas.width-paddleWidth) {
	paddleX += 7;
}
else if(leftPressed && paddleX > 0) {
	paddleX -= 7;
}

// Move the ball
x += dx;
y += dy;

requestAnimationFrame(draw);
}

draw();
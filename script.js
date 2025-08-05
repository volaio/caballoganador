const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Paletas
const paddleHeight = 100, paddleWidth = 12;
let leftY = canvas.height / 2 - paddleHeight / 2;
let rightY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 7;

// Pelota
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSize = 12;
let ballSpeedX = 6;
let ballSpeedY = 4;

// Puntuación
let score1 = 0, score2 = 0;

// Estado del juego
let paused = false;

// Input
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Pausar
document.addEventListener("keydown", e => {
  if (e.code === "Space") paused = !paused;
});

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = (Math.random() * 4 + 2) * (Math.random() > 0.5 ? 1 : -1);
}

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawNet() {
  ctx.strokeStyle = "#555";
  ctx.setLineDash([10, 15]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);
}

function update() {
  if (paused) return;

  // Movimiento paletas
  if (keys["w"] && leftY > 0) leftY -= paddleSpeed;
  if (keys["s"] && leftY < canvas.height - paddleHeight) leftY += paddleSpeed;
  if (keys["ArrowUp"] && rightY > 0) rightY -= paddleSpeed;
  if (keys["ArrowDown"] && rightY < canvas.height - paddleHeight) rightY += paddleSpeed;

  // Movimiento pelota
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebote arriba/abajo
  if (ballY < 0 || ballY > canvas.height - ballSize) {
    ballSpeedY *= -1;
  }

  // Colisión con paleta izquierda
  if (ballX <= paddleWidth &&
      ballY > leftY &&
      ballY < leftY + paddleHeight) {
    ballSpeedX *= -1.1; // más rápido
    const offset = ballY - (leftY + paddleHeight / 2);
    ballSpeedY = offset * 0.2;
  }

  // Colisión con paleta derecha
  if (ballX >= canvas.width - paddleWidth - ballSize &&
      ballY > rightY &&
      ballY < rightY + paddleHeight) {
    ballSpeedX *= -1.1; // más rápido
    const offset = ballY - (rightY + paddleHeight / 2);
    ballSpeedY = offset * 0.2;
  }

  // Punto para jugador 2
  if (ballX < 0) {
    score2++;
    updateScore();
    resetBall();
  }

  // Punto para jugador 1
  if (ballX > canvas.width) {
    score1++;
    updateScore();
    resetBall();
  }
}

function updateScore() {
  document.getElementById("score1").textContent = score1;
  document.getElementById("score2").textContent = score2;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
  drawRect(0, leftY, paddleWidth, paddleHeight, "#FFD700");
  drawRect(canvas.width - paddleWidth, rightY, paddleWidth, paddleHeight, "#00BFFF");
  drawBall(ballX, ballY, ballSize, "#fff");

  if (paused) {
    ctx.fillStyle = "#fff";
    ctx.font = "40px sans-serif";
    ctx.fillText("⏸️ PAUSADO", canvas.width / 2 - 100, canvas.height / 2);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();

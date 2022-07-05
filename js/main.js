"use strict";

(() => {
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Ball {
    constructor(balls) {
      this.balls = balls;
      this.canvas = this.balls.canvas;
      this.paddle = this.balls.paddle;
      this.game = this.balls.game;
      this.ctx = this.canvas.getContext("2d");
      this.x = rand(30, 250);
      this.y = 30;
      this.r = 10;
      this.vx = rand(2, 4) * (Math.random() < 0.5 ? 1 : -1);
      this.vy = rand(2, 4);
      this.visible = true;
    }

    bounce() {
      this.vy *= -1;
    }

    reposition(paddleTop) {
      this.y = paddleTop - this.r;
    }

    hide() {
      this.visible = false;
      this.vy = 0;
    }

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    getR() {
      return this.r;
    }

    getVY() {
      return this.vy;
    }

    update() {
      const ballBottom = this.getY() + this.getR();
      const paddleTop = paddle.y;
      const ballTop = this.getY() - this.getR();
      const paddleBottom = paddle.y + paddle.h;
      const ballCenter = this.getX();
      const paddleLeft = paddle.x;
      const paddleRight = paddle.x + paddle.w;
      if (
        ballBottom > paddleTop &&
        ballTop < paddleBottom &&
        ballCenter > paddleLeft &&
        ballCenter < paddleRight
      ) {
        this.bounce();
        this.reposition(paddleTop);
        this.game.addScore();
      }

      this.x += this.vx;
      this.y += this.vy;

      if (this.y - this.r > this.canvas.height && this.visible) {
        this.balls.reduceBallNum();
        this.hide();
      }

      if (this.x - this.r < 0 || this.x + this.r > this.canvas.width) {
        this.vx *= -1;
      }

      if (this.y - this.r < 0) {
        this.vy *= -1;
      }
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "#fdfdfd";
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  class Paddle {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.w = 60;
      this.h = 16;
      this.x = this.canvas.width / 2 - this.w / 2;
      this.y = this.canvas.height - 32;
      this.mouseX = this.x;
      this.addHandler();
    }

    addHandler() {
      document.addEventListener("mousemove", (e) => {
        this.mouseX = e.clientX;
      });
    }

    update() {
      const rect = this.canvas.getBoundingClientRect();
      this.x = this.mouseX - rect.left - this.w / 2;

      if (this.x < 0) {
        this.x = 0;
      }

      if (this.x + this.w > this.canvas.width) {
        this.x = this.canvas.width - this.w;
      }
    }

    draw() {
      this.ctx.fillStyle = "#fdfdfd";
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }

  class Balls {
    constructor(ballNum, canvas, paddle, game) {
      this.ballNum = ballNum;
      this.canvas = canvas;
      this.paddle = paddle;
      this.game = game;
      this.elements = [];
      for (let i = 1; i <= ballNum; i++) {
        this.elements.push(new Ball(this));
      }
      this.cheatNum = 0;
    }

    cheat() {
      this.cheatNum++;
      if (this.cheatNum > 4) {
        this.game.gameOver();
      }

      this.elements.forEach((element) => {
        if (element.getVY() > 0) {
          element.bounce();
        }
      });
    }

    reduceBallNum() {
      this.ballNum--;
    }

    update() {
      if (this.ballNum === 0) {
        this.game.gameOver();
      }

      this.elements.forEach((element) => {
        element.update();
      });
    }

    draw() {
      this.elements.forEach((element) => {
        element.draw();
      });
    }
  }

  class Screen {
    constructor(canvas, paddle, balls, game) {
      this.canvas = canvas;
      this.paddle = paddle;
      this.balls = balls;
      this.game = game;
      this.ctx = this.canvas.getContext("2d");
      this.loop();
    }

    update() {
      this.paddle.update();
      this.balls.update();
    }

    draw() {
      if (this.game.isGameOver) {
        this.drawGameOver();
        return;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.paddle.draw();
      this.balls.draw();
      this.drawScore();
    }

    drawScore() {
      this.ctx.font = "20px Arial";
      this.ctx.fillStyle = "#fdfdfd";
      this.ctx.fillText(this.game.score, 10, 25);
    }

    drawGameOver() {
      this.ctx.font = '28px "Arial Black"';
      this.ctx.fillStyle = "tomato";
      this.ctx.fillText("Game Over", 50, 150);
    }

    loop() {
      if (this.game.isGameOver) {
        this.drawGameOver();
        return;
      }

      this.update();
      this.draw();

      requestAnimationFrame(() => {
        this.loop();
      });
    }
  }

  class Game {
    constructor() {
      this.isGameOver = false;
      this.score = 0;
    }

    addScore() {
      this.score++;
    }

    gameOver() {
      this.isGameOver = true;
    }
  }

  const canvas = document.querySelector("canvas");
  if (typeof canvas.getContext === "undefined") {
    return;
  }

  const ballNum = Math.floor(rand(2, 6));
  const game = new Game(canvas);
  const paddle = new Paddle(canvas);
  const balls = new Balls(ballNum, canvas, paddle, game);
  new Screen(canvas, paddle, balls, game);

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      balls.cheat();
    }
  });
})();

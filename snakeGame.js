function PointObj(x, y) {
    this.x = x;
	this.y = y;
    this.add = function(Point) {
        return new PointObj(
            this.x + Point.x, this.y + Point.y);
    }
    this.equals = function(Point) {
        return this.x == Point.x && this.y == Point.y;
    }
    return this;
}

function SnakeObj(context, tileSize, head, length=5) {
    this.context = context;
	this.tileSize = tileSize;
	this.head = head;
	this.length = length;
    this.body = [];
    this.isBody = function(Point) {
        for (let bodyPoint of this.body) {
            if (bodyPoint.equals(Point))
                return true;
        }
        return false;
    }
    this.move = function(Point) {
        this.body.push(this.head);
        this.head = this.head.add(Point);
    }
    this.drawSegment = function(Point, Color="grey") {
        this.context.fillStyle = Color;
        this.context.fillRect(
            Point.x, Point.y, this.tileSize, this.tileSize);
    }
    this.draw = function() {
        this.drawSegment(this.head);
        if (this.body.length > this.length)
            this.drawSegment(this.body.shift(), "skyblue");
    }
    return this;
}

function GameObj(canvas, width, height, tileSize) {
    this.canvas = canvas;
	this.width = width;
	this.height = height;
	this.tileSize = tileSize;
    this.context, this.snake, this.animation;
    this.directions = {
        "north": new PointObj(0, -this.tileSize),
        "south": new PointObj(0, this.tileSize),
        "west": new PointObj(-this.tileSize, 0),
        "east": new PointObj(this.tileSize, 0),
    }
    this.heading = this.directions["south"];
    this.align = function(Val) {
        return Math.floor(Val) * this.tileSize;
    }
    this.placeFood = function() {
        do {
            this.food = new PointObj(
                this.align(Math.random() * this.width),
                this.align(Math.random() * this.height));
        } while (this.snake.isBody(this.food));
        this.context.fillStyle = "Yellow";
        this.context.fillRect(
            this.food.x, this.food.y, this.tileSize, this.tileSize);
    }
    this.isOutOfBounds = function(Point) {
        return (Point.x < 0 || Point.y < 0 ||
                Point.x > this.canvas.width ||
                Point.y > this.canvas.height);
    }
    this.isEnd = function() {
        return (this.isOutOfBounds(this.snake.head) ||
                this.snake.isBody(this.snake.head));
    }
    this.isEating = function() {
        return this.snake.head.equals(this.food);
    }
    this.changeDirection = function(e) {
        switch(e.keyCode) {
            case 38: this.heading = this.directions["north"]; break;
            case 40: this.heading = this.directions["south"]; break;
            case 37: this.heading = this.directions["west"]; break;
            case 39: this.heading = this.directions["east"]; break;
        }
    }
    this.loop = function() {
        this.snake.move(this.heading);
        if (this.isEnd()) {
            clearInterval(this.animation);
        }
        else if (this.isEating()) {
            this.placeFood();
            this.snake.length += 3;
            this.snake.draw();
        }
        else {
            this.snake.draw();
        }
    }
    this.init = function() {
        this.canvas.width = this.width * this.tileSize;
        this.canvas.height = this.height * this.tileSize;
        this.context = canvas.getContext('2d');
        startingPoint = new PointObj(this.tileSize, this.tileSize);
        this.snake = new SnakeObj(this.context, this.tileSize, startingPoint);
        this.placeFood();
        document.addEventListener("keydown", this.changeDirection.bind(this));
        this.animation = setInterval(this.loop.bind(this), 100);
    }
    return this;
}

function init() {
    let Game = new GameObj(document.querySelector("CANVAS"), 30, 20, 20);
    Game.init();
}

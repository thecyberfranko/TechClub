function snakeAI_Obj() {
    this.game, this.snake, this.path = [], this.safe = [];
    this.orthogonalToPoint = function(Src, Dest, Horizontal) {
        if (Horizontal) {  // Favor east/west movement then north/south
            if (Src.x < Dest.x) return this.game.directions["east"];
            if (Src.x > Dest.x) return this.game.directions["west"];
            if (Src.y < Dest.y) return this.game.directions["south"];
            if (Src.y > Dest.y) return this.game.directions["north"];
        }
        else {  // Favor north/south movement then east/west
            if (Src.y < Dest.y) return this.game.directions["south"];
            if (Src.y > Dest.y) return this.game.directions["north"];
            if (Src.x < Dest.x) return this.game.directions["east"];
            if (Src.x > Dest.x) return this.game.directions["west"];
        }
        throw "On target";
    };
    this.getOrthogonalSeq = function(Point, Dest, Horizontal) {
        let Path = [];
        while (!Point.equals(Dest)) {
            heading = this.orthogonalToPoint(Point, Dest, Horizontal);
            Point = Point.add(heading);
            Path.push(Point);
        }
        return Path;
    };
    this.isSafe = function(Path) {
        for (Point of Path) {
            if (this.snake.isBody(Point) && !Point.equals(this.snake.body[0]))
                return false;
        }
        return true;
    };
    this.getOrthogonalSegment = function(Src, Dest) {
        for (let i = 0; i < 2; ++i) {
            let Segment = this.getOrthogonalSeq(Src, Dest, i);
            if (this.isSafe(Segment))
                return Segment;
        }
        return [];
    };
    this.simulateMovement = function(Path) {
        const justAte = 6;
        this.backupBody = this.snake.body.slice();
        this.snake.body = this.snake.body.concat(Path);  // Move head
        this.snake.body = this.snake.body.slice(  // Move tail
            -(this.snake.length + justAte));
        let diff = this.snake.body.length - this.snake.length;
        if (diff < 0 || diff > justAte) {
            console.log("difference", diff);
            console.log("length", this.snake.length,
                        "backup", this.backupBody.length);
            console.log("path", Path.length);
            console.log("simulated", this.snake.body.length);
        }
    };
    this.resetMovement = function() {
        this.snake.body = this.backupBody;
    };
    this.getRecoverySegment = function() {
        Path = this.getOrthogonalSegment(this.snake.head, this.snake.body[0]);
        if (Path.length < 6 && this.safe.length) {
            console.log("Correction", "Missing path:", !Path.length);
            Path = this.safe;
        }
        else
            this.safe = [];
        return Path;
    };
    this.getOrthogonalPath = function() {
        let head = this.snake.head, tailBeforeSim = this.snake.body[0];
        let Path = this.getOrthogonalSegment(head, this.game.food);
        if (Path.length) {
            this.simulateMovement(Path);
            let forcedBend = this.snake.length > this.game.width;
            let safePath = this.getOrthogonalSegment(this.game.food,
                forcedBend ? this.snake.body[0] : tailBeforeSim);
            this.resetMovement();
            if (safePath.length) {  // Safe to get food
                this.safe = safePath;
                return Path;
            }
        }
        return this.getRecoverySegment();
    };
    this.loop = function() {
        this.game.loop();
        if (!this.path.length)
            this.path = this.getOrthogonalPath();
        this.game.heading = this.path.shift().sub(this.snake.head);
    };
    this.fillPath = function(Path, Color, Color2, conFunc) {
        conFunc = conFunc ? conFunc : function() { return false; };
        for (Point of Path) {
            this.game.context.fillStyle = (conFunc(Point) ? Color2 : Color);
            this.game.context.fillRect(
                Point.x, Point.y, this.game.tileSize, this.game.tileSize);
        }
        this.game.context.fillStyle = "Yellow";
        this.game.context.fillRect(
            this.game.food.x, this.game.food.y, this.game.tileSize, this.game.tileSize);
    };
    this.getOrthogonalPath = function() {
        let head = this.snake.head, tail = this.snake.body[0];
        let foodPath = this.getOrthogonalSegment(head, this.game.food);
        if (foodPath.length) {
            // !May continously chase tail.
            this.simulateMovement(foodPath);
            // this.fillPath(this.snake.body, "Orange");
            let safePath = this.getOrthogonalSegment(
                this.game.food, this.snake.length > this.game.height ? this.snake.body[0] : tail);
            this.safe = safePath;
            this.resetSimMovement();
            if (safePath.length){  // Safe to get food
                return foodPath;
            }
        }
        return this.getOrthogonalSegment(head, this.snake.body[0]);
    };
    this.loop = function() {
        this.game.loop();
        if (!this.path.length) {
            // this.fillPath(this.safe, "Skyblue");
            this.path = this.getOrthogonalPath();
            // this.fillPath(this.snake.body, "Grey");
            // this.fillPath(this.path, "Green");
            // this.fillPath(this.safe, "Blue");
            console.log();
        }
        try { this.game.heading = this.path.shift().sub(this.snake.head); }
        catch (e) { console.log(typeof(this.path), this.path)}
    }
    this.init = function() {
        this.game = new GameObj(document.querySelector("CANVAS"), 30, 20, 20);
        this.game.init();
        this.snake = this.game.snake;
    };
    this.beginLoop = function() {
        this.game.animation = setInterval(this.loop.bind(this), 50);
    }
};

function init() {
    let snakeAI = new snakeAI_Obj();
    snakeAI.init();
    snakeAI.beginLoop();
}

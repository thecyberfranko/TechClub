function snakeAI_Obj() {
    this.game, this.snake, this.path = [];
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
    this.getSeqAlong = function(Point, Dest, Horizontal) {
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
    this.getSegment = function(Src, Dest) {
        for (let i = 0; i < 2; ++i) {
            let Segment = this.getSeqAlong(Src, Dest, i);
            if (this.isSafe(Segment))
                return Segment;
        }
        return [];
    };
    this.getOutsidePath = function(Source) {
        return [];
    };
    this.getSafePath = function(Source) {
        let head = this.snake.head, tail = this.snake.body[0], Detour = [];
        let pathToTail = this.getSegment(Source, tail);
        for (let i = 0; !pathToTail.length && i < 3; ++i) {
            let Segment = this.getOutsidePath(Source, i);
            if (!Segment.length) {
                Detour = [];
                break;
            }
            Detour.concat(Segment);
            pathToTail = this.getSegment(Segment[Segment.length-1], tail);
        }
        if (!pathToTail.length)
            Detour = [];
        return Detour.concat(pathToTail);
    };
    this.getPath = function() {
        let foodPath = this.getSegment(this.snake.head, this.game.food);
        if (foodPath.length) {
            let safePath = this.getSafePath(this.game.food);
            if (safePath.length)  // Safe to get food
                return foodPath;
        }
        let Path = this.getSafePath(this.snake.head)
        console.log(typeof(this.path), this.path)
        return Path;
    };
    this.loop = function() {
        this.game.loop();
        if (!this.path.length) {
            this.path = this.getPath();
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

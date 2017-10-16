function snakeAI_Obj() {
    this.game, this.snake, this.path = { "next": function() { return false; } };
    this.toPoint = function(Src, Dest, Horizontal) {
        if (Horizontal) {
            if (Src.x < Dest.x) return this.game.directions["east"];
            if (Src.x > Dest.x) return this.game.directions["west"];
            if (Src.y < Dest.y) return this.game.directions["south"];
            if (Src.y > Dest.y) return this.game.directions["north"];
        }
        else {
            if (Src.y < Dest.y) return this.game.directions["south"];
            if (Src.y > Dest.y) return this.game.directions["north"];
            if (Src.x < Dest.x) return this.game.directions["east"];
            if (Src.x > Dest.x) return this.game.directions["west"];
        }
    };
    this.getPathFeatures = function(i) {
        let Horizontal = false, Points;
        switch (i) {
            case 0:
                Horizontal = true;
            case 1:
                Points = [this.snake.head, this.game.food, this.snake.body[0]];
                break;
            case 2:
                Horizontal = true;
            case 3:
                Points = [this.snake.head, this.snake.body[0]];
                break;
        }
        return {"Points": Points, "Horizontal": Horizontal};
    };
    this.getSeqAlong = function(Points, Horizontal) {
        let Path = [];
        for (i = 0; i < Points.length - 1; ++i) {
            let Point = Points[i], Dest = Points[i + 1];
            while (!Dest.equals(Point)) {
                heading = this.toPoint(Point, Dest, Horizontal);
                Point = Point.add(heading);
                Path.push(Point);
            }
        }
        return Path;
    };
    this.isBadPath = function(Path) {
        if (!Path.length) return true;
        for (Point of Path) {
            if (this.snake.isBody(Point) && !Point.equals(this.snake.body[0]))
                return true;
        }
        return false;
    };
    this.loop = function() {
        this.game.loop();
        if (!this.path.length) {
            let i = 0, Features, Path;
            do {
                Features = this.getPathFeatures(i);
                Path = this.getSeqAlong(Features.Points, Features.Horizontal);
            } while (i++ < 7 && this.isBadPath(Path));
            this.path = this.getSeqAlong(
                Features.Points.slice(0, 2), Features.Horizontal);
        }
        this.game.heading = this.path.shift().sub(this.snake.head);
    }
    this.init = function() {
        this.game = new GameObj(document.querySelector("CANVAS"), 30, 20, 20);
        this.game.init();
        this.snake = this.game.snake;
    };
    this.beginLoop = function() {
        this.game.animation = setInterval(this.loop.bind(this), 50);
    }
}

function init() {
    let snakeAI = new snakeAI_Obj();
    snakeAI.init();
    snakeAI.beginLoop();
}

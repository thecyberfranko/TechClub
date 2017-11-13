function PointObj(x, y) {
    this.x = x;
    this.y = y;
    return this;
}

function PositionedObj(context, value, point) {
    this.context = context;
    this.value = value;
    this.point = point;
    this.examine = function() {
        this.context.beginPath();
        this.context.arc(
            this.point.x + 14, this.point.y - 8, 18, 0, 2*Math.PI);
        this.context.stroke();
    };
    this.draw = function() {
        context.strokeText(this.value.toString(), this.point.x, this.point.y);
        context.fillText(this.value.toString(), this.point.x, this.point.y);
    };
    return this;
}

function ColoredNumbersObj(canvas, context, point, offsetX) {
    this.canvas = canvas;
    this.context = context;
    this.point = point;
    this.offsetX = offsetX;
    this.posSet = [];
    this.swapDisplayedPos = function(i, j) {
        let tempPoint = this.posSet[i].point;
        this.posSet[i].point = this.posSet[j].point;
        this.posSet[j].point = tempPoint;
    }
    this.swapSetPos = function(i, j) {
        let tempObj = this.posSet[i];
        this.posSet[i] = this.posSet[j]
        this.posSet[j] = tempObj;
    }
    this.swap = function(i, j) {
        this.posSet[i].examine();
        this.posSet[j].examine();
        this.swapDisplayedPos(i, j)
        this.swapSetPos(i, j)
    };
    this.examine = function(i) {
        this.posSet[i].examine();
    };
    this.update = function() {
    };
    this.draw = function() {
        for (posNum of this.posSet) {
            let hue = Math.floor(360 / posNum.value);
            context.fillStyle = `hsl(${hue}, 100%, 50%)`;
            posNum.draw();
        }
    };
    this.init = function(numberSet) {
        for (let i= 0; i < numberSet.length; ++i) {
            let point = new PointObj(this.offsetX * i + this.point.x,
                                     this.point.y);
            this.posSet.push(new PositionedObj(
                context, numberSet[i], point))
        }
    };
    return this;
}

function SortingObj() {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.draw = function() {
        this.context.save()
        this.context.font = "24px Arial"
        this.context.lineWidth = 3;
        this.randomColors.draw();
        this.sortedColors.draw();
        this.context.restore()
    };
    this.init = function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        let randomNumbers = [];
        for (let i= 0; i < 20; ++i)
            randomNumbers.push(Math.floor(Math.random() * 15) + 1);
        let sort = randomNumbers.slice();
        sort.sort((a, b) => { return a > b ? 1 : (a < b ? -1 : 0); });
        this.randomColors = new ColoredNumbersObj(this.canvas, this.context,
                                                  new PointObj(10, 30), 45);
        this.sortedColors = new ColoredNumbersObj(this.canvas, this.context,
                                                  new PointObj(10, 60), 45);
        this.randomColors.init(randomNumbers);
        this.sortedColors.init(sort);
        this.draw();
    };
    return this;
}

function init() {
    let sorter = new SortingObj();
    sorter.init();
}

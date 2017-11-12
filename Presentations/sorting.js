function PositionedObj(context, value, x, y) {
    this.context = context;
    this.value = value;
    this.x = x;
    this.y = y;
    this.examine = function() {
        this.context.beginPath();
        this.context.arc(this.x + 13, this.y - 10, 20, 0, 2*Math.PI);
        this.context.stroke();
    };
    this.move = function(x, y) {
        this.x += x;
        this.y += y;
    };
    this.draw = function() {
        context.strokeText(this.value.toString(), this.x, this.y);
        context.fillText(this.value.toString(), this.x, this.y);
    };
    return this;
}

function ColoredNumbersObj(canvas, context, x, y, offsetx) {
    this.canvas = canvas;
    this.context = context;
    this.x = x;
    this.y = y;
    this.offsetx = offsetx;
    this.posSet = [];
    this.swap = function(i, j) {
        swapI = this.posSet[i];
        swapJ = this.posSet[j];
        tempX = swapI.x
        tempY = swapI.y
        swapI.x = swapJ.x
        swapI.y = swapJ.y
        swapJ.x = tempX
        swapJ.y = tempY
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
            this.posSet.push(new PositionedObj(
                context, numberSet[i], offsetx * i + x, y))
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

        this.randomColors = new ColoredNumbersObj(this.canvas, this.context, 0, 30, 45);
        this.sortedColors = new ColoredNumbersObj(this.canvas, this.context, 0, 60, 45);
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

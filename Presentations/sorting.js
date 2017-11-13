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
        return this.value;
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
        return this.posSet[i].examine();
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
        this.length = numberSet.length;
        for (let i= 0; i < this.length; ++i) {
            let point = new PointObj(this.offsetX * i + this.point.x,
                                     this.point.y);
            this.posSet.push(new PositionedObj(
                context, numberSet[i], point))
        }
    };
    return this;
}

function BubbleSort(cNums) {
    this.cNums = cNums;
    this.i = this.passes = 0;
    this.swapping = this.swapped = false;
    this.iter = function() {
        if (this.swapping) {
            this.cNums.swap(this.i, this.i + 1);
            this.i = ((this.i + 1 < this.cNums.length - 1 - this.passes)
                       ? this.i + 1 : 0)
            this.swapping = false;
            return true;
        }
        if (this.cNums.examine(this.i) > this.cNums.examine(this.i + 1)) {
            this.swapping = this.swapped = true;
            return true;
        }
        if (this.i + 1 < this.cNums.length - 1 - this.passes){
            ++this.i;
            return true;
        }
        if (this.swapped) {
            this.i = 0;
            this.swapped = false;
            ++this.passes;
            return true
        }
        return false;
    };
    return this;
}

function InsertionSort(cNums) {
    this.cNums = cNums;
    this.i = this.j = 1;
    this.iter = function() {
        if (this.swapping) {
            this.cNums.swap(this.j, this.j - 1);
            --this.j;
            if (this.j == 0) {
                ++this.i;
                this.j = this.i;
            }
            this.swapping = false;
            return true;
        }
        if (this.cNums.examine(this.j) < this.cNums.examine(this.j - 1)) {
            this.swapping = true;
            return true;
        }
        if (this.i + 1 < this.cNums.length) {
            ++this.i;
            this.j = this.i;
            return true;
        }
        return false;
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
        this.context.restore()
    };
    this.loop = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.insertion_sort.iter())
            clearInterval(this.animation);
        this.draw();
    };
    this.init = function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        let randomNumbers = [];
        for (let i= 0; i < 20; ++i)
            randomNumbers.push(Math.floor(Math.random() * 15) + 1);
        this.randomColors = new ColoredNumbersObj(
            this.canvas, this.context, new PointObj(10, 30), 45, randomNumbers);
        this.randomColors.init(randomNumbers);
        // this.bubble_sort = new BubbleSort(this.randomColors);
        this.insertion_sort = new InsertionSort(this.randomColors);
        this.animation = setInterval(this.loop.bind(this), 500);
    };
    return this;
}

function init() {
    let sorter = new SortingObj();
    sorter.init();
}

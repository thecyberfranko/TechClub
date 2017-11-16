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

function ColoredNumbersObj(canvas, context, point, offsetX, numberSet) {
    this.canvas = canvas;
    this.context = context;
    this.point = point;
    this.offsetX = offsetX;
    this.posSet = [];
    this.swap = function(i, j) {
        this.posSet[i].examine();
        this.posSet[j].examine();
        [this.posSet[i].point, this.posSet[j].point] = [  // Display
            this.posSet[j].point, this.posSet[i].point];
        [this.posSet[i], this.posSet[j]] = [this.posSet[j], this.posSet[i]];
    };
    this.rotate = function(toFront, fromBack) {
        this.posSet[toFront].examine();
        this.posSet[fromBack].examine();
        let tempPoint = this.posSet[toFront].point;
        let temp = this.posSet[fromBack];
        for (let i = fromBack; i > toFront; --i) {
            [this.posSet[i].point, this.posSet[i-1].point] = [
                this.posSet[i-1].point, this.posSet[i].point];
            [this.posSet[i], this.posSet[i-1]] = [this.posSet[i-1], this.posSet[i]];
        }
        this.posSet[toFront] = temp;
        // this.posSet[toFront].point = tempPoint;
    };
    this.examine = function(i) {
        return this.posSet[i].examine();
    };
    this.block = function(i, j) {
        let begin = this.posSet[i].point.x;
        let end = this.posSet[j].point.x;
        let y = this.posSet[j].point.y;
        this.context.save()
        this.context.strokeRect(begin, y - 27, end - begin  + 27, 36);
        this.context.restore();
    };
    this.draw = function() {
        this.context.save()
        this.context.font = "24px Arial"
        this.context.lineWidth = 3;
        for (posNum of this.posSet) {
            let hue = Math.floor(360 / (posNum.value + 1));
            context.fillStyle = `hsl(${hue}, 100%, 50%)`;
            posNum.draw();
        }
        this.context.restore()
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
    this.init(numberSet);
    return this;
}

function BubbleSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.i = this.passes = 0;
    this.swapping = this.swapped = false;
    this.update = function() {
        if (this.done) return;
        else if (this.swapping) {
            this.cNums.swap(this.i, this.i + 1);
            this.i = ((this.i + 1 < this.cNums.length - 1 - this.passes)
                       ? this.i + 1 : 0)
            this.swapping = false;
            return true;
        }
        else if (this.cNums.examine(this.i) > this.cNums.examine(this.i + 1)) {
            this.swapping = this.swapped = true;
            return true;
        }
        else if (this.i + 1 < this.cNums.length - 1 - this.passes){
            ++this.i;
            return true;
        }
        else if (this.swapped) {
            this.i = 0;
            this.swapped = false;
            ++this.passes;
            return true
        }
        else {
            this.done = true;
        }
    };
    this.draw = function() {
        this.cNums.draw();
    };
    return this;
}

function InsertionSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.i = this.j = 1;
    this.update = function() {
        if (this.done) return;
        if (this.swapping) {
            this.cNums.swap(this.j, this.j - 1);
            --this.j;
            if (this.j == 0) {
                ++this.i;
                this.j = this.i;
            }
            this.swapping = false;
        }
        else if (this.cNums.examine(this.j) < this.cNums.examine(this.j - 1)) {
            this.swapping = true;
        }
        else if (this.i + 1 < this.cNums.length) {
            ++this.i;
            this.j = this.i;
        }
        else {
            this.done = true;
        }
    };
    this.draw = function() {
        this.cNums.draw();
    };
    return this;
}

function ShellSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.division = 3;
    this.gap = Math.ceil(this.cNums.length / this.division);
    this.i = this.j = this.gap;
    this.update = function() {
        if (this.done) return;
        if (this.swapping) {
            this.cNums.swap(this.j, this.j - this.gap);
            this.j -= this.gap;
            if (this.j < this.gap && this.i + 1 < this.cNums.length) {
                ++this.i;
                this.j = this.i;
            }
            else if (this.j < this.gap) {
                this.j = this.i = this.gap = (
                    this.gap == 1 ? 0 : Math.ceil(this.gap / this.division));
            }
            this.swapping = false;
        }
        else if (this.cNums.examine(this.j) < this.cNums.examine(this.j - this.gap)) {
            this.swapping = true;
        }
        else if (this.i + 1 < this.cNums.length) {
            ++this.i;
            this.j = this.i;
            console.assert(this.j < this.cNums.length, this.j);
        }
        else if (this.gap > 1) {
            this.j = this.i = this.gap = (
                this.gap == 1 ? 0 : Math.ceil(this.gap / this.division));
        }
        else {
            this.done = true;
        }
    };
    this.draw = function() {
        this.cNums.draw();
    };
    return this;
}

function QuickSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.swapping = false;
    this.pivot = this.cNums.posSet[0].value;
    this.ftIdx = this.left = 0;
    this.bkIdx = this.right = cNums.length - 1;
    this.queue = [];
    this.update = function() {
        if (this.done) return;
        this.cNums.block(this.ftIdx, this.bkIdx);
        if (this.swapping) {
            this.cNums.swap(this.left++, this.right--);
            this.swapping = false;
            return;
        }
        else if (this.left <= this.right) {
            if (this.cNums.examine(this.left) < this.pivot) {
                this.left++;
            }
            else if (this.cNums.examine(this.right) > this.pivot) {
                this.right--;
            }
            else if (this.left <= this.right) {
                this.swapping = true;
            }
            return;
        }
        if (this.right - this.ftIdx > 0)
            this.queue.unshift([this.ftIdx, this.right]);
        if (this.bkIdx - this.left > 0)
            this.queue.push([this.left, this.bkIdx]);
        if (this.queue.length) {
            let pair = this.queue.shift();
            this.ftIdx = this.left = pair[0];
            this.bkIdx = this.right = pair[1];
            this.pivot = this.cNums.posSet[this.ftIdx].value;
            this.update();
        }
        else {
            this.done = true;
        }
    };
    this.draw = function() {
        this.cNums.draw();
    };
    return this;
}

function MergeSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.rotating = false;
    this.queue = [];
    ///[0, Math.floor(this.cNums.length / 2)], [Math.floor(this.cNums.length / 2), this.cNums.length -1]];
    for (let i = 0; i < cNums.length; ++i)
        this.queue.push([i, i])
    this.prep = function() {
        [this.ftIdx, this.ftSplit] = this.queue.shift();
        [this.bkShift, this.bkIdx] = this.queue.shift();
        this.left = this.ftIdx;
        this.right = this.bkShift;
        if (Math.abs(this.bkShift - this.ftSplit) > 1) {
            this.queue.push([this.ftIdx, this.ftSplit]);
            this.ftIdx = this.left = this.right;
            this.ftSplit = this.bkIdx;
            [this.bkShift, this.bkIdx] = this.queue.shift();
            this.right = this.bkShift;
        }
    }
    this.prep();
    this.update = function() {
        if (this.done) return;
        this.cNums.block(this.ftIdx, this.ftSplit);
        this.cNums.block(this.bkShift, this.bkIdx);
        if (this.rotating) {
            this.cNums.rotate(this.left, this.right);
            this.rotating = false;
            if (this.left < this.right && this.right < this.bkIdx) {
                ++this.left;
                ++this.right;
            }
            else if (this.left + 1 == this.right) {
                this.update();
            }
        }
        else if (this.cNums.examine(this.left) > this.cNums.examine(this.right)) {
            this.rotating = true;
        }
        else if (this.left < this.right - 1 && this.right <= this.bkIdx) {
            ++this.left;
        }
        else {
            this.queue.push([this.ftIdx, this.bkIdx]);
            if (this.queue.length > 1)
                this.prep();
            else
                this.done = true;
        }
    };
    this.draw = function() {
        this.cNums.draw();
    };
    return this;
}

function SortingObj() {
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.loop = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let sorter of this.sorters) {
            sorter.update();
            sorter.draw();
        }
    };
    this.init = function(sortingAlgorithms) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // [5, 3, 2, 9, 7, 4, 6, 8, 10, 7, 9, 9, 13, 11, 13, 13, 11, 15, 15, 15]
        let randomNumbers = [];
        for (let i= 0; i < 20; ++i)
            randomNumbers.push(Math.floor(Math.random() * 15) + 1);
        this.sorters = [];
        for (let i= 0; i < sortingAlgorithms.length; ++i) {
            let point = new PointObj(10, i * 60 + 30);
            let randomColors = new ColoredNumbersObj(
                this.canvas, this.context, point , 40, randomNumbers);
            this.sorters[i] = new sortingAlgorithms[i](randomColors);
        }
        this.animation = setInterval(this.loop.bind(this), 500);
    };
    return this;
}

function init() {
    let sorter = new SortingObj();
    sorter.init([BubbleSort, InsertionSort, ShellSort, QuickSort, MergeSort]);
}

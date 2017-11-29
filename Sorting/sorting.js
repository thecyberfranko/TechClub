function PointObj(x, y) {
    this.x = x;
    this.y = y;
    return this;
}

function ColoredNumbersObj(canvas, context, point, offsetX, numberSet) {
    this.canvas = canvas;
    this.context = context;
    this.point = point;
    this.offsetX = offsetX;
    this.numSet = numberSet;
    this.length = numberSet.length;
    this.getPos = function(i) {
        return new PointObj(this.offsetX * i + this.point.x,
                this.point.y + 35);
    };
    this.examine = function(i, Color = "Black") {
        this.context.strokeStyle = Color;
        let indexPoint = this.getPos(i);
        this.context.beginPath();
        this.context.arc(
            indexPoint.x + 14, indexPoint.y - 8, 18, 0, 2*Math.PI);
        this.context.stroke();
        return this.numSet[i];
    };
    this.swap = function(i, j) {
        this.context.save();
        this.examine(i, "Red");
        this.examine(j, "Red");
        this.context.restore();
        [this.numSet[i], this.numSet[j]] = [this.numSet[j], this.numSet[i]];
    };
    this.block = function(i, j, Color="Black") {
        let begin = this.getPos(i).x;
        let indexPoint_J = this.getPos(j);
        let end = indexPoint_J.x;
        let y = indexPoint_J.y;
        this.context.save()
        this.context.strokeStyle = Color;
        this.context.strokeRect(begin, y - 27, end - begin  + 27, 36);
        this.context.restore();
    };
    this.rotate = function(toFront, fromBack) {
        this.context.save();
        this.examine(toFront, "Red");
        this.examine(fromBack, "Red");
        this.block(toFront, fromBack, "Red");
        this.context.restore();
        let temp = this.numSet[fromBack];
        for (let i = fromBack; i > toFront; --i) {
            [this.numSet[i], this.numSet[i-1]] = [this.numSet[i-1], this.numSet[i]];
        }
        this.numSet[toFront] = temp;
    };
    this.draw = function(Heading) {
        this.context.save()
        this.context.lineWidth = 3;
        this.context.font = "24px Consolas"
        this.context.fillText(Heading, this.point.x, this.point.y);
        for (let i = 0; i < this.numSet.length; ++i) {
            let Num = this.numSet[i];
            let hue = Math.floor(360 / 18 * (Num + 2));
            let indexPoint = this.getPos(i);
            context.fillStyle = `hsl(${hue}, 100%, 50%)`;
            context.strokeText(Num.toString(), indexPoint.x, indexPoint.y);
            context.fillText(Num.toString(), indexPoint.x, indexPoint.y);
        }
        this.context.restore()
    };
    this.reset = function(numberSet) {
        this.numSet = numberSet;
        this.length = numberSet.length;
    };
    return this;
}

function NoSort(cNums) {
    this.cNums = cNums;
    this.done = true;
    this.reset = function(numberSet) {
        this.cNums.reset(numberSet);
        this.done = true;
    };
    this.update = function(startTime) {};
    this.draw = function() {
        this.cNums.draw("Number Set");
    };
    return this;
}

function BubbleSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.i = this.passes = 0;
    this.swapping = this.swapped = false;
    this.swapCount = 0;
    this.time = new Date();
    this.nextPass = function() {
        this.i = 0;
        this.swapped = false;
        ++this.passes;
    };
    this.update = function(startTime) {
        this.time = (new Date()).getTime() - startTime;
        if (this.swapping) {
            ++this.swapCount;
            this.cNums.swap(this.i, this.i + 1);
            ++this.i;
            if (this.i == this.cNums.length - 1 - this.passes && this.swapped)
                this.nextPass();
            this.swapping = false;
        }
        else if (this.cNums.examine(this.i) > this.cNums.examine(this.i + 1)) {
            this.swapping = this.swapped = true;
        }
        else if (this.i + 1 < this.cNums.length - 1 - this.passes){
            ++this.i;
        }
        else if (this.swapped) {
            this.nextPass();
        }
        else {
            this.done = true;
        }
    };
    this.draw = function() {
        this.cNums.draw(`Bubble Sort         ${Math.floor(this.time / 1000)}s    ${this.swapCount} Swaps`);
    };
    this.reset = function(numberSet) {
        this.cNums.reset(numberSet);
        this.done = false;
        this.i = this.passes = 0;
        this.swapping = this.swapped = false;
        this.swapCount = 0;
        this.time = new Date();
    };
    return this;
}

function SelectionSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.i = this.j = this.min = 0;
    this.rotating = false;
    this.swapCount = 0;
    this.time = new Date();
    this.nextPass = function() {
        ++this.i;
        if (this.i < this.cNums.length)
            this.j = this.min = this.i;
        else
            this.done = true;
    };
    this.update = function(startTime) {
        this.time = (new Date()).getTime() - startTime;
        if (this.rotating) {
            ++this.swapCount;
            this.cNums.rotate(this.i, this.min);
            this.nextPass();
            this.rotating = false;
        }
        else if (this.cNums.examine(this.j) < this.cNums.examine(this.min)) {
            this.cNums.block(this.i, this.i);
            this.min = this.j;
        }
        else {
            this.cNums.block(this.i, this.i);
        }
        if (this.min == this.i && this.j + 1 == this.cNums.length)
            this.nextPass();
        else if (this.j + 1 == this.cNums.length)
            this.rotating = true;
        else
            ++this.j;
    };
    this.draw = function() {
        this.cNums.draw(`Selection Sort      ${Math.floor(this.time / 1000)}s    ${this.swapCount} Swaps`);
    };
    this.reset = function(numberSet) {
        this.cNums.reset(numberSet);
        this.done = false;
        this.i = this.j = this.min = 0;
        this.rotating = false;
        this.swapCount = 0;
        this.time = new Date();
    };
    return this;
}

function InsertionSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.i = this.j = 1;
    this.swapCount = 0;
    this.time = new Date();
    this.update = function(startTime) {
        this.time = (new Date()).getTime() - startTime;
        if (this.swapping) {
            ++this.swapCount;
            this.cNums.swap(this.j, this.j - 1);
            --this.j;
            if (this.j == 0 && this.i + 1 < this.cNums.length) {
                ++this.i;
                this.j = this.i;
            }
            else if (this.j == 0) {
                this.done = true;
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
        this.cNums.draw(`Insertion Sort      ${Math.floor(this.time / 1000)}s    ${this.swapCount} Swaps`);
    };
    this.reset = function(numberSet) {
        this.cNums.reset(numberSet);
        this.done = false;
        this.i = this.j = 1;
        this.swapCount = 0;
        this.time = new Date();
    };
    return this;
}

function BinaryInsertion(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.i =  1;
    this.rangeLow = this.rangeHigh, this.j = 0;
    this.swapCount = 0;
    this.time = new Date();
    this.update = function(startTime) {
        this.time = (new Date()).getTime() - startTime;
        if (this.rangeLow == this.rangeHigh) {
            this.j += (
                this.cNums.examine(this.i) < this.cNums.examine(this.j) ? 0 : 1);
            if (this.j != this.i) {
                ++this.swapCount;
                this.cNums.rotate(this.j, this.i);
            }
            ++this.i;
            if (this.i < this.cNums.length) {
                this.rangeLow = 0;
                this.rangeHigh = this.i;
                this.j = Math.floor((this.rangeHigh - this.rangeLow) / 2 + this.rangeLow);
            }
            else
                this.done = true;
        }
        else {
            this.cNums.block(this.rangeLow, this.rangeHigh);
            let temp = Math.floor((this.rangeHigh - this.rangeLow) / 2 + this.rangeLow);
            if (this.cNums.examine(this.i) < this.cNums.examine(this.j))
                this.rangeHigh = this.j;
            else
                this.rangeLow = this.j + 1
            this.j = temp;
        }
    };
    this.draw = function() {
        this.cNums.draw(`Binary Insertion    ${Math.floor(this.time / 1000)}s    ${this.swapCount} Swaps`);
    };
    this.reset = function(numberSet) {
        this.cNums.reset(cNums);
        this.done = false;
        this.i =  1;
        this.rangeLow = this.rangeHigh, this.j = 0;
        this.swapCount = 0;
        this.time = new Date();
    };
    return this;
}

function ShellSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.division = 3;
    this.gap = Math.ceil(this.cNums.length / this.division);
    this.i = this.j = this.gap;
    this.swapCount = 0;
    this.time = new Date();
    this.update = function(startTime) {
        this.time = (new Date()).getTime() - startTime;
        if (this.swapping) {
            ++this.swapCount;
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
        this.cNums.draw(`Shell Sort          ${Math.floor(this.time / 1000)}s    ${this.swapCount} Swaps`);
    };
    this.reset = function(numberSet) {
        this.cNums.reset(cNums);
        this.done = false;
        this.division = 3;
        this.gap = Math.ceil(this.cNums.length / this.division);
        this.i = this.j = this.gap;
        this.swapCount = 0;
        this.time = new Date();
    };
    return this;
}

function QuickSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.swapping = false;
    this.ftIdx = this.left = 0;
    this.bkIdx = this.right = cNums.length - 1;
    this.queue = [];
    this.swapCount = 0;
    this.time = new Date();
    this.getNewPivot = function() {
        let pivotIdx = Math.floor(
            Math.random() * (this.bkIdx - this.ftIdx) + this.ftIdx);
        return this.cNums.numSet[pivotIdx];
    };
    this.manageGroup = function() {
        if (this.right - this.ftIdx > 0)
            this.queue.unshift([this.ftIdx, this.right]);
        if (this.bkIdx - this.left > 0)
            this.queue.push([this.left, this.bkIdx]);
        if (this.queue.length) {
            let pair = this.queue.shift();
            this.ftIdx = this.left = pair[0];
            this.bkIdx = this.right = pair[1];
            this.pivot = this.getNewPivot();
        }
        else {
            this.done = true;
        }
    };
    this.update = function(startTime) {
        this.time = (new Date()).getTime() - startTime;
        this.cNums.block(this.ftIdx, this.bkIdx);
        if (this.swapping) {
            ++this.swapCount;
            this.cNums.swap(this.left++, this.right--);
            this.swapping = false;
        }
        else if (this.left <= this.right) {
            if (this.cNums.examine(this.left) < this.pivot) {
                this.left++;
            }
            else if (this.cNums.examine(this.right) > this.pivot) {
                this.right--;
            }
            else if (this.left <= this.right &&
                     this.cNums.numSet[this.left] != this.cNums.numSet[this.right])
            {
                this.swapping = true;
            }
            else if (this.left + 1 <= this.right + 1) {
                ++this.left;
                --this.right;
            }
            else {
                this.manageGroup();
            }
        }
        else {
            this.manageGroup()
        }
    };
    this.draw = function(time) {
        this.cNums.draw(`Quick Sort          ${Math.floor(this.time / 1000)}s    ${this.swapCount} Swaps`);
    };
    this.reset = function(numberSet) {
        this.cNums.reset(numberSet);
        this.done = false;
        this.swapping = false;
        this.pivot = this.getNewPivot();
        this.ftIdx = this.left = 0;
        this.bkIdx = this.right = cNums.length - 1;
        this.queue = [];
        this.swapCount = 0;
        this.time = new Date();
    };
    this.pivot = this.getNewPivot();
    return this;
}

function MergeSort(cNums) {
    this.cNums = cNums;
    this.done = false;
    this.rotating = false;
    this.queue = [];
    this.time = new Date();
    this.swapCount = 0;
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
    };
    this.update = function(startTime) {
        if (this.done) return;
        this.time = (new Date()).getTime() - startTime;
        this.cNums.block(this.ftIdx, this.ftSplit);
        this.cNums.block(this.bkShift, this.bkIdx);
        if (this.rotating) {
            ++this.swapCount;
            this.cNums.rotate(this.left, this.right);
            this.rotating = false;
            if (this.left < this.right && this.right < this.bkIdx) {
                ++this.left;
                ++this.right;
            }
            else if (this.left + 1 == this.right) {
                this.update(startTime);
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
        this.cNums.draw(`Merge Sort          ${Math.floor(this.time / 1000)}s    ${this.swapCount} Swaps`);
    };
    this.reset = function(numberSet) {
        this.cNums.reset(numberSet);
        this.done = false;
        this.rotating = false;
        this.queue = [];
        this.time = new Date();
        this.swapCount = 0;
        for (let i = 0; i < cNums.length; ++i)
            this.queue.push([i, i])
        this.prep();
    };
    this.prep();
    return this;
}

function SortingObj(sortingAlgorithms) {
    this.sortingAlgorithms = sortingAlgorithms;
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.iteration = 0;
    // https://stackoverflow.com/a/12646864
    this.shuffle = function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    this.numberGen = function() {
        let numberSet = [];
        switch (this.iteration) {
            case 0: // Fully Sorted
                for (let i = 0; i < 30; ++i)
                    numberSet.push(i + 1);
                break;
            case 1: // Non Unique Random
            case 7:
                for (let i = 0; i < 30; ++i)
                    numberSet.push(Math.floor(Math.random() * 15) + 1);
                break;
            case 2: // Unique Alterating Left
                for (let i = 0; i < 30; ++i)
                    numberSet.push(i % 2 == 0 ? i / 2 + 1: 30 - Math.floor(i / 2));
                break;
            case 3: // Accending Decending
                for (let i = 0; i < 30; ++i)
                    numberSet.push(i < 15 ? i + 1 : 15 - i + 15);
                break;
            case 4: // Unique Random
            case 10:
                for (let i = 0; i < 30; ++i)
                    numberSet.push(i + 1);
                this.shuffle(numberSet);
                break;
            case 5: // Non Unique Alternating Both
            case 11:
                for (let i = 0; i < 30; ++i)
                    numberSet.push(i % 2 == 0 ? i / 2 + 1: 15 - Math.floor(i / 2));
                break;
            case 6: // Reverse
                for (let i = 0; i < 30; ++i)
                    numberSet.push(30 - i);
                break;
            case 8: // Unique Alterating Right
                for (let i = 0; i < 30; ++i)
                    numberSet.push(i % 2 == 0 ? 30 - i / 2: Math.floor(i / 2) + 1);
                break;
            case 9: // Decending Accending
                for (let i = 0; i < 30; ++i)
                    numberSet.push(i < 15 ? 15 - i : i - 14);
                break;
        }
        this.iteration = (this.iteration + 1) % 12;
        return numberSet;
    };
    this.reset = function() {
        let numberSet = this.numberGen();
        for (let sorter of this.sorters)
            sorter.reset(numberSet.splice());
    };
    this.loop = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let allSorted = true;
        for (let sorter of this.sorters) {
            if (!sorter.done) {
                sorter.update(this.startTime);
                allSorted = false;
            }
            sorter.draw();
        }
        if (allSorted) {
            clearInterval(this.animation);
            setTimeout(this.init.bind(this), 4000);
        }
    };
    this.init = function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        let numberSet = this.numberGen();
        this.sorters = [];
        for (let i= 0; i < this.sortingAlgorithms.length; ++i) {
            let point = new PointObj(10, i * 85 + 30);
            let randomColors = new ColoredNumbersObj(
                this.canvas, this.context, point , 40, numberSet.slice());
            this.sorters[i] = new this.sortingAlgorithms[i](randomColors);
        }
        this.context.lineWidth = 2;
        this.startTime = (new Date()).getTime();
        this.animation = setInterval(this.loop.bind(this), 300);
    };
    return this;
}

function init() {
    let sorter = new SortingObj([
        NoSort, BubbleSort, SelectionSort, InsertionSort, BinaryInsertion,
        ShellSort, QuickSort, MergeSort
    ]);
    sorter.init();
}

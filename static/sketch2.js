let canvas, button, slider, span, modeBox, cleanBox, autoSaveBox, saveButton, autoRunBox, status;

const divN = 800;
const angleN = divN / 80;

let n = 3;
let lines = [];
let mode = true;
let isLoop = true;

let angles = [];

function setup() {
    let size = min(windowWidth, windowHeight);
    canvas = createCanvas(size, size);
    let posX = (windowWidth - width) / 2;
    let posY = (windowHeight - height) / 2;
    canvas.position(posX, posY);
    canvas.style('border-radius', '100px');
    canvas.mouseClicked(canvasClicked);

    button = createButton('Start over');
    button.mouseClicked(buttonClicked);

    slider = createSlider(2, 11, n);
    slider.input(sliderMoved);
    span = createSpan();

    modeBox = createCheckbox('lines', true);
    cleanBox = createCheckbox('clean', false);
    autoRunBox = createCheckbox('autorun', false);
    autoSaveBox = createCheckbox('autosave', false);

    saveButton = createButton('save');
    saveButton.mouseClicked(saveMyCanvas);

    status = createP();

    const divPI = TWO_PI / divN;
    for (let i = 1; i < angleN; i++) {
        let ang = divPI * i;
        angles.push(ang);
        angles.push(-ang);
    }
    angles.sort();

    sliderMoved();
    buttonClicked();
}

let c = 0;
function draw() {
    c++;
    status.html(round(map(c / divN, 0, 1, 0, 100)) + '%');

    if (c === divN) {
        noLoop();
        if (autoSaveBox.checked()) {
            saveMyCanvas();
        }
        if (autoRunBox.checked()) {
            buttonClicked();
        }
    }

    if (cleanBox.checked()) {
        background(0);
    }

    for (let i = 1; i < n; i++) {
        lines[i].update();
        lines[i].draw(mode);
    }
}

function saveMyCanvas() {
    let name = n - 1 + '';
    for (let i = 1; i < n; i++) {
        name += '_' + lines[i].angleIndex;
    }
    saveCanvas(name);
}

function canvasClicked() {
    if (isLoop) {
        noLoop();
    } else {
        loop();
    }
    isLoop = !isLoop;
}

function sliderMoved() {
    let value = slider.value();
    span.html(value - 1);
    if (value < n) {
        lines.splice(value);
    } else {
        for (let i = n; i < value; i++) {
            lines.push(new Line(lines[i - 1], random(PI)));
        }
    }
    n = value;
}

function buttonClicked() {
    c = 0;
    n = slider.value();
    mode = modeBox.checked();
    lines = [];

    lines[0] = {x2: width / 2, y2: height / 2};
    for (let i = 1; i < n; i++) {
        lines[i] = new Line(lines[i - 1], (i % 2) * PI);
    }
    background(0);
    loop();
}


function Line(previous, angle, radius, col, delta) {
    this.previous = previous;
    this.radius = radius || random(50, 100);
    this.col = col || color(random(255), random(255), random(255));
    this.angleIndex = floor(random(angles.length));
    this.delta = delta || angles[this.angleIndex];
    console.log(this.delta, this.angleIndex);

    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.angle = angle || 0;

    this.draw = function (mode = true) {
        stroke(this.col);
        if (mode) {
            line(this.x1, this.y1, this.x2, this.y2);
        } else {
            point(this.x2, this.y2);
        }
    };

    this.update = function () {
        this.calcBegin();
        this.calcEnd();
        this.angle += this.delta;
    };

    this.calcBegin = function () {
        this.x1 = this.previous.x2;
        this.y1 = this.previous.y2;
    };

    this.calcEnd = function () {
        this.x2 = this.x1 + this.radius * cos(this.angle);
        this.y2 = this.y1 + this.radius * sin(this.angle);
    };
}

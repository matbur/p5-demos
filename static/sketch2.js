let canvas, button, slider, span, modeBox, cleanBox;

const d = 50;

let n = 3;
let lines = [];
let mode = true;
let isLoop = true;

let angles = [];

function setup() {
    canvas = createCanvas(windowWidth - 2 * d, windowHeight - 2 * d);
    canvas.position(d, d);
    canvas.style('border-radius', '100px');
    canvas.mouseClicked(canvasClicked);

    button = createButton('Start over');
    button.mouseClicked(buttonClicked);

    slider = createSlider(2, 101, n);
    slider.input(sliderMoved);
    span = createSpan();

    modeBox = createCheckbox('mode', true);
    cleanBox = createCheckbox('clean', false);

    for (let i = 50; i < 150; i++) {
        let ang = HALF_PI / i;
        angles.push(ang);
        angles.push(-ang);
    }

    sliderMoved();
    buttonClicked();
}

function draw() {
    if (cleanBox.checked()) {
        background(0);
    }

    for (let i = 1; i < n; i++) {
        lines[i].update();
        lines[i].draw(mode);
    }
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
    n = slider.value();
    mode = modeBox.checked();
    lines = [];

    lines[0] = {x2: width / 2, y2: height / 2};
    for (let i = 1; i < n; i++) {
        lines[i] = new Line(lines[i - 1], random(PI));
    }
    background(0);
    redraw();
}


function Line(previous, angle, radius, col, delta) {
    this.previous = previous;
    this.radius = radius || random(50, 100);
    this.col = col || color(random(255), random(255), random(255));
    this.delta = delta || angles[floor(random(angles.length))];

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


// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }
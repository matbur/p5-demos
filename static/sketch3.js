const d = 50;
let canvas;

let item;

function setup() {
    canvas = createCanvas(windowWidth - 2 * d, windowHeight - 2 * d);
    canvas.position(d, d);
    canvas.style('border-radius', '100px');

    let message = createVector(1, 1);
    console.log(message);


    item = new Item(createVector(0, height / 2), createVector(1, 1));

    ellipseMode(CENTER);
}
function draw() {
    // frameRate(15);
    background(0);

    item.render();
    item.update();

    console.log(item.speed);
}

function Item(pos, speed, acc) {
    this.pos = pos || createVector();
    this.speed = speed || createVector();
    this.acc = acc || createVector(0, 1);

    this.render = function () {
        let s = 50;
        ellipse(this.pos.x, this.pos.y, s);
    };

    this.update = () => {
        this.updateSpeed();
        this.updatePos();
        this.out();
    };

    this.updateSpeed = function () {
        if (abs(this.speed.y) < 1 && this.pos.y > height - 10) {
            this.speed.y = 0;
            return;
        }
        this.speed.add(this.acc);
        // this.speed.mult(.999);
        this.speed.x *= .99;
        this.speed.y *= .999;
    };

    this.updatePos = function () {
        this.pos.add(this.speed);
    };

    this.out = function () {
        if (this.pos.y > height) {
            console.log('is out');
            this.speed.y *= -1;
        }
    }
}

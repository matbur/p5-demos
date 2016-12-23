let canvas;
let bubbles = [];
let d = 50;

function setup() {
    canvas = createCanvas(windowWidth - 2 * d, windowHeight - 2 * d);
    canvas.position(d, d);
    canvas.style('border-radius', '100px');

    for (let i = 0; i < 200; i++) {
        bubbles[i] = new Bubble(random(width), random(height));
    }
    ellipseMode(CENTER);
    background(0);
}

function draw() {
    // background(0);

    for (let i = bubbles.length - 1; i > -1; i--) {
        bubbles[i].update();
        bubbles[i].draw();

        if (bubbles[i].shouldDie()) {
            bubbles.splice(i, 1);
        }

        for (let j = bubbles.length - 1; j > i; j--) {
            if (bubbles[i].intersects(bubbles[j])) {
                bubbles[i].randomColor();
                bubbles[j].randomColor();
            }

        }
    }
}

function mousePressed() {
    bubbles.push(new Bubble(mouseX, mouseY));
    for (let i = 0; i < 10; i++) {
        bubbles.push(new Bubble())
    }
}

function Bubble(x, y, r, col) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.r = r || 20;
    this.rgb = col || [random(255), random(255), random(255)];
    this.ttl = random(500);

    this.draw = function () {
        fill(this.col);
        noStroke();
        ellipse(this.x, this.y, this.r)
    };

    this.update = function () {
        this.col = color(...this.rgb, this.ttl);

        this.x += random(-1, 1);
        this.y += random(-1, 1);

        if (this.isOutX()) {
            this.x = abs(this.x - width);
        }

        if (this.isOutY()) {
            this.y = abs(this.y - width);
        }

        this.ttl--;
    };

    this.isOutX = function () {
        return this.x < 0 || this.x > width;
    };

    this.isOutY = function () {
        return this.y < 0 || this.y > height;
    };

    this.shouldDie = function () {
        return this.ttl <= 0;
    };

    this.intersects = function (other) {
        let d = dist(this.x, this.y, other.x, other.y);
        return d < this.r + other.r;
    };

    this.randomColor = function () {
        this.rgb = [random(255), random(255), random(255)];
    }
}

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }
class Charge {
    constructor(x, y, q=0) {
        this.x = x
        this.y = y
        this.q = q
    }

    rotate({angle, source}) {
        let ox = source && source.x || 0
        let oy = source && source.y || 0

        let x = this.x - ox
        let y = this.y - oy

        let cos = Math.cos(angle)
        let sin = Math.sin(angle)

        return new Charge(
            x * cos - y * sin + ox,
            y * cos + x * sin + oy
        )
    }

    add(vector) {
        return new Charge(
            this.x + vector.x,
            this.y + vector.y
        )
    }

    sub(vector) {
        return new Charge(
            this.x - vector.x,
            this.y - vector.y
        )
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y
    }

    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    magSq() {
        return this.x ** 2 + this.y ** 2
    }

    dist(vec) {
        return Math.sqrt( this.distSq(vec) )
    }

    distSq(vec) {
        return (this.x - vec.x) ** 2 + (this.y - vec.y) ** 2
    }

    normalize() {
        var m = this.mag()
        return this.div(m)
    }

    mul(s) {
        return new Charge(
            this.x * s,
            this.y * s
        )
    }

    div(s) {
        return new Charge(
            this.x / s,
            this.y / s
        )
    }
}

function createField(sx, sy, width, height, stepX, stepY) {
    let vecs = []

    for (let x = sx; x < width; x += stepX) {
        for (let y = sy; y < height; y += stepY) {
            vecs.push( new Charge(x, y) )
        }
    }

    return vecs
}

const K = 10000//00

let charges = []

function drawArrow(x, y, vector) {
    line(x, y, x + vector.x, y + vector.y)
}

function calculateField(position) {
    return charges.reduce((field, charge) =>
        field.add(
            charge.sub(position).normalize().mul(
                (K * charge.q) / position.distSq(charge)
            )
        )
    , new Charge(0, 0))
        .normalize().mul(10)
}

function setup(){
    createCanvas(innerWidth, innerHeight)

    charges.push( new Charge(100, 100, 100) )
    charges.push( new Charge(300, 300, -100) )

    // noLoop()
}

function draw() {
    background(0, 100, 200)

    for (let charge of charges) {
        circle(charge.x, charge.y, 10)
    }

    for (let position of createField(0, 0, innerWidth, innerHeight, 10, 10)) {
        drawArrow(position.x, position.y, calculateField(position))
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
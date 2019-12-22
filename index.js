const PI  = Math.PI
const PI2 = Math.PI * 2

let time = 0

let innerWheelRadius = 100

function setup(){
    createCanvas(innerWidth, innerHeight, WEBGL)
}

function draw() {
    time += deltaTime

    let y = time / 100
    let θ = y / (100 * PI2)

    background(0, 100, 200)

    // translate(0,-innerHeight / 4)

    rotateZ(Math.PI / 2)
    rotateX(Math.PI / 2 + Math.PI / 6)

    push()
        rotateY(θ)

        cylinder(200, 50, 24, 1)
        
        translate(0,50)
        cylinder(innerWheelRadius, 50, 24, 1)
    pop()

    push()
        translate(y + 300,50,100)
        box(100)
    pop()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
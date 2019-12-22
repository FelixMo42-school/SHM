const G = 9.81
const K = 100
const mass = 10
const springLength = 10
const meter = 25

let pointOfRotation;
let position;
let velocity;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)

    pointOfRotation = createVector(0, 0)
    position = createVector(-2, -2)
    velocity = createVector(0, 0)
}

function update(dt) {
    let springPull = K * ( pointOfRotation.dist(position) - springLength )
    let angle = -position.heading()

    let force = {
        x: -springPull * Math.cos(angle),
        y: springPull * Math.sin(angle) - mass * G
    }

    velocity.x += force.x / mass * dt
    velocity.y += force.y / mass * dt

    position.x += velocity.x * dt
    position.y += velocity.y * dt
}

function draw() {
    if (deltaTime !== 0) {
        let dt = deltaTime / 1000

        dt /= 5

        update(dt)
    }

    // 

    clear()
    
    translate(
        window.innerWidth / 2,
        100 // window.innerHeight / 2
    )

    line(
        pointOfRotation.x * meter, -pointOfRotation.y * meter,
        position.x * meter, -position.y * meter
    )

    circle(pointOfRotation.x * meter, -pointOfRotation.y * meter, 10)
    circle(position.x * meter, -position.y * meter, 10)
}
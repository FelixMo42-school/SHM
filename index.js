const PI  = Math.PI
const PI2 = Math.PI * 2

let time = 0

let massSize = 100

let innerWheelRadius = 100
let outerWheelRadius = 200

let wheelWidth = 50
 
function calcMomentOfInertia() {
    return 10
}

let I = calcMomentOfInertia()

//////////////////
// P5 FUNCTIONS //
//////////////////

function setup(){
    createCanvas(innerWidth, innerHeight, WEBGL)
}

function draw() {
    // add the time since last frame to running total
    time += deltaTime

    // do the math
    let y = time / 100 + 300
    let θ = y / (innerWheelRadius * PI2)

    // color the background
    background(0, 100, 200)

    // let user take controll of viewport
    orbitControl()

    // // shift everything up
    // translate(0,-innerHeight / 4)

    // set default rotatation to pleasing angle
    rotateZ(Math.PI / 2)
    rotateX(Math.PI / 2 + Math.PI / 6)

    // // set the rendering material
    // normalMaterial()

    // draw the wheels
    push()
        // rotate the wheel by theta
        rotateY(θ)

        // draw the big wheel
        cylinder(outerWheelRadius, wheelWidth)
        
        // move infront of the big wheel
        translate(0, wheelWidth)

        // draw the small wheel
        cylinder(innerWheelRadius, wheelWidth)
    pop()

    // draw the mass
    push()
        // draw line connecting the inner wheel to the mass
        line(
            0, wheelWidth, innerWheelRadius,
            y, wheelWidth, innerWheelRadius,
        )

        // shift it to correct position
        translate(y, wheelWidth, massSize)

        // draw the box
        box(massSize)
    pop()
}

function windowResized() {
    // resize canvas to fit new screen
    resizeCanvas(windowWidth, windowHeight)
}
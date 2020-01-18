const g = 9.81
const density = .0001 // density of materials

let length = 100
let mass = 0

function getVal(name) {
    return parseInt( document.getElementById(name).value )
}

function calculateVariables() {
    innerWheelRadius     = getVal("innerWheelRadius")

    mass                 = getVal("mass")
    massSize             = ( mass / density ) ** (1/3)

    adjustableMass       = getVal("adjustableMass")
    adjustableMassSize   = ( adjustableMass / density ) ** (1/3)
    adjustableMassRadius = getVal("adjustableMassRadius")
    

    let innerWheelMass = wheelWidth * PI * innerWheelRadius ** 2 * density
    let outerWheelMass = wheelWidth * PI * outerWheelRadius ** 2 * density

    // calculate the moment of inertia 
    let momentOfInertia =
        (4 * adjustableMass * adjustableMassRadius ** 2) +
        (.5 * innerWheelMass * innerWheelRadius ** 2) +
        (.5 * outerWheelMass * outerWheelRadius ** 2)

    // save the acceleration
    aceleration = mass * g / (mass + momentOfInertia / innerWheelRadius ** 2)

    //display values on page
    document.getElementById("momentOfInertia").innerHTML = Math.round(momentOfInertia)
    document.getElementById("aceleration").innerHTML = Math.round(aceleration * 100) / 100
    document.getElementById("pulleyRad").innerHTML = Math.round(innerWheelRadius)
    document.getElementById("HMass").innerHTML = Math.round(mass)
    document.getElementById("RMass").innerHTML = Math.round(adjustableMass)
    document.getElementById("RMassDist").innerHTML = Math.round(adjustableMassRadius)
}

//////////////////
// P5 FUNCTIONS //
//////////////////

function setup(){
    // make the canvas take up the full screen
    createCanvas(innerWidth, innerHeight, WEBGL)

    // set min and max for the inner wheel
    document.getElementById("innerWheelRadius").min = 1
    document.getElementById("innerWheelRadius").max = outerWheelRadius
    document.getElementById("innerWheelRadius").value = outerWheelRadius / 2
    
    // set up the slider for adjustable mass radius
    document.getElementById("adjustableMassRadius").min = outerWheelRadius
    document.getElementById("adjustableMassRadius").max = outerWheelRadius * 2
    document.getElementById("adjustableMassRadius").value = outerWheelRadius * 1.5

    // initilize varables
    calculateVariables()

    // figure out if the time slider is being draged or not
    document.getElementById("time").onmousedown = () => { timeSlide = true }
    document.getElementById("time").onmouseup = () => { timeSlide = false }

    // dont draw the polygones
    noStroke()
}

function draw() {
    // add the time since last frame to running total
    if (timeSlide) {
        time = parseInt( document.getElementById("time").value )
    } else if (!document.getElementById("togBtn").checked) {
        time += deltaTime / 1000
        document.getElementById("time").value = time
        document.getElementById("timeDisplay").innerHTML = Math.round(time)
    }

    // calculate the y position and the angle
    let y = .5 * aceleration * time ** 2 + massSize + outerWheelRadius
    let θ = y / innerWheelRadius

    // color the background
    background(0, 0, 153)
    
    //add some lighting to the scene
    ambientLight(60, 60, 60);
    pointLight(255, 255, 255, outerWheelRadius, outerWheelRadius, 100);

    // let user take controll of viewport
    orbitControl()

    // shift everything up
    translate(0,-innerHeight / 4)

    // set default rotatation to pleasing angle
    rotateZ(Math.PI / 2)
    rotateX(Math.PI / 2 + Math.PI / 6)

    // set the rendering material
    ambientMaterial(250);

    // draw the wheels
    drawWheels(y, θ)

    // draw the adjustable masses
    drawAdjustableMass(y, θ)

    // draw the mass
    drawMass(y, θ)

    //draw the table and supports
    drawTable()
}

function drawWheels(y, θ) {
    push()

    // rotate the wheel by theta
    rotateY(θ)

    // draw the big wheel
    cylinder(outerWheelRadius, wheelWidth, 100)
    
    // move infront of the big wheel
    translate(0, wheelWidth)

    // draw the small wheel
    cylinder(innerWheelRadius, wheelWidth, 100)

    pop()
}

function drawAdjustableMass(y, θ) {
    push()

    // rotate the wheel by theta
    rotateY(θ)

    
    for (let i = 0; i < 4; i ++) {
        push()

        // rotate around to correct angle
        rotateY(PI / 2 * i)


        push()
            rotateZ(PI / 2)

            translate(0,outerWheelRadius)

            // conect it to wheels
            cylinder(5, outerWheelRadius * 2)
        pop()

        // move out
        translate(adjustableMassRadius, 0)

        // draw the big wheel
        sphere(adjustableMassSize)

        pop()
    }

    pop()
}

function drawMass(y, θ) {
    push()

    // draw string connecting the inner wheel to the mass
    push()
        stroke(51)
        strokeWeight(4)

        line(
            0, wheelWidth, innerWheelRadius,
            y, wheelWidth, innerWheelRadius,
        )
    pop()

    // shift it to correct position
    translate(y, wheelWidth, innerWheelRadius)
    
    // draw the box
    box(massSize)

    pop()
}

function drawTable(){
    push()

    //the center rod
    push()
    //shift to correct position for center rod
    translate(0, -65, 0)
    //draw the rod
    cylinder(10, 150, 40)
    pop()
    
    //the stand center
    push()
    //shift to correct position for center rod
    translate(0, -120, 0)
    //draw the rod
    cylinder(80, 42, 40)
    pop()

    //the right support
    push()
    //shift to correct position for tabletop
    translate(250, -120, 0)
    rotateY(PI/3)
    //draw the tabletop
    box(20, 37, 600)
    pop()

    //the left support
    push()
    //shift to correct position for tabletop
    translate(250, -120, 0)
    rotateY(-PI/3)
    //draw the tabletop
    box(20, 38, 600)
    pop()

    //the top support
    push()
    //shift to correct position for tabletop
    translate(20, -120, 0)
    //draw the tabletop
    box(50, 40, 300)
    pop()

    //the tabletop
    push()
    //shift to correct position for tabletop
    translate(500, -120, 0)
    //draw the tabletop
    box(30, 100, 800)
    pop()

    pop()
}

function windowResized() {
    // resize canvas to fit new screen
    resizeCanvas(windowWidth, windowHeight)
}
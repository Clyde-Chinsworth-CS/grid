// P5.JS TEMPLATE
var grid
var NUM_ROWS, NUMD_COLS, CELL_SIZE
var player
var stage
var countdown
var val

// SETUP FUNCTION - Runs once at beginning of program
function setup() {


    grid = []

    for (var i = 0; i < 21; i++) {
        grid.push([])
    }

    font = loadFont("data/AldotheApache.ttf")
    stage = 0
    countdown = 3
    val = "black"

    NUM_ROWS = 21;
    NUM_COLS = 21;
    CELL_SIZE = 25

    createCanvas(NUM_COLS * CELL_SIZE, NUM_ROWS * CELL_SIZE);
    background("black");

    player = new Player(12.5, height / 2, "#FF00CC", 1)
    player2 = new Player(width - 12.5, height / 2, "#1EBBFF", 2)

}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    background("black");



    // run logic

    // draw frame
    drawGrid()
    player.show()
    player2.show()

    if (stage == 0) {
        textAlign(CENTER)
        fill("black")
        stroke("white")
        textSize(25)
        textFont(font)
        text("FILL THE BOARD", width / 2, height / 2 - 50)

        text(countdown, width / 2, height / 2)

        stroke(player.str)
        text("WASD", 100, height / 2)
        stroke(player2.str)
        text("ARROWS", width - 100, height / 2)

        if (frameCount % 60 === 0) { // countdown from 3
            countdown--
        }

        if (countdown == 0) { // if timer reaches 0, advance stage
            stage = 1
            countdown = 60
        }
    } else if (stage == 1) {
        player.move(87, 83, 65, 68)
        player2.move(38, 40, 37, 39)

        if (frameCount % 60 === 0) { // countdown from 60
            countdown--
        }
        stroke("white")
        text(countdown, width / 2, 0 + 47.5)

        if (countdown == 0) { // if timer reaches 0, advance stage
            stage = 2
            countdown = 1
        }
    } else {
        if (countdown == 1) {
            calcScore()
        }
        countdown = 0
        stroke(player.str)
        text(player.score, 100, height / 2)
        stroke(player2.str)
        text(player2.score, width - 100, height / 2)

        if (frameCount % 30 === 0) { // controls flickering of reset prompt
            if (val == 1) {
                val = 0
            } else {
                val = 1
            }
        }

        if (val == 1) {
            stroke("white")
            text("SPACEBAR TO RESET", width / 2, height / 2 + 50)
        }
        
        if (player.score > player2.score) {
            stroke(player.str)
            text("WASD WINS", width / 2, height / 2)
        } else if (player2.score > player.score) {
            stroke(player2.str)
            text("ARROWS WINS", width / 2, height / 2)
        } else {
            stroke("white")
            text("DRAW", width / 2, height / 2)
        }

        if (keyIsDown(32)) {
            reset()
            stage = 0
            countdown = 3
            player.x = 12.5
            player.y = height / 2
            player2.x = width - 12.5
            player2.y = height / 2
            player.score = 0
            player2.score = 0

        }

    }
}

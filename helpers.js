function drawGrid() {
    noStroke()

    for (var rows = 0; rows < NUM_ROWS; rows++) {
        // draw a row
        for (var cols = 0; cols < NUM_COLS; cols++) {
            if (grid[rows][cols] == 1) {
                fill("#FF00CC")
            } else if (grid[rows][cols] == 2) {
                fill("#1EBBFF")
            } else {
                fill(0)
            }
            rect(cols * CELL_SIZE, rows * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }
    }
}

function calcScore() { // searches grid for values, adds score based on color
    for (var rows = 0; rows < NUM_ROWS; rows++) {
        for (var cols = 0; cols < NUM_COLS; cols++) {
            if (grid[rows][cols] == 1) {
                player.score++
            } else if (grid[rows][cols] == 2) {
                player2.score++
            }
        }
    }
}

function reset() { // resets grid
    for (var rows = 0; rows < NUM_ROWS; rows++) {
        for (var cols = 0; cols < NUM_COLS; cols++) {
            grid[rows][cols] = 0
        }
    }
}

function Player(x, y, str, i) {
    this.x = x
    this.y = y
    this.h = 25
    this.delta = 2.5
    this.str = str
    this.val = i
    this.score = 0
}

Player.prototype.move = function (up, down, left, right) {

    var curCol = floor(this.y / CELL_SIZE)
    var curRow = floor(this.x / CELL_SIZE)
    grid[curCol][curRow] = this.val

    if (keyIsDown(up)) {
        this.y -= this.delta
    }
    if (keyIsDown(down)) {
        this.y += this.delta
    }
    if (keyIsDown(left)) {
        this.x -= this.delta
    }
    if (keyIsDown(right)) {
        this.x += this.delta
    }

    if (this.x + this.h / 2 > width) {
        this.x = width - this.h / 2
    }
    if (this.x - this.h / 2 < 0) {
        this.x = 0 + this.h / 2
    }
    if (this.y + this.h / 2 > height) {
        this.y = height - this.h / 2
    }
    if (this.y - this.h / 2 < 0) {
        this.y = 0 + this.h / 2
    }

}

Player.prototype.show = function () {
    fill("black")
    stroke(this.str)
    strokeWeight(4)
    ellipse(this.x, this.y, this.h)

}

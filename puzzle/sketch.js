//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let cols;
let rows;
let pieces = [];
let pieceSize;
let activeID = false;
let renderScale;
let puzzleWidth;
let puzzleHeight;

async function setup() {
  img = await loadImage(`https://randomfox.ca/images/11.jpg`);
  createCanvas(windowWidth, windowHeight);

  parts = split_image(img, 100);

  puzzleWidth = cols * pieceSize;
  puzzleHeight = rows * pieceSize;
  renderScale = min(width / puzzleWidth, height / puzzleHeight);
  console.log(puzzleWidth);
}

function draw() {
  //scale(renderScale)
  background(100);

  render_grid();
  render_finished_puzzle(10);
  run_pieces();
  render_pieces();
}

function run_pieces() {
  if (activeID !== false) {
    parts[activeID].posX = mouseX - pieceSize / 2;
    parts[activeID].posY = mouseY - pieceSize / 2;
  }
}

function render_grid() {
  noFill();
  stroke(0);
  strokeWeight(1);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      square(x * pieceSize, y * pieceSize, pieceSize);
    }
  }
}

function mouseReleased() {
  if (activeID !== false) {
    let part = parts[activeID];

    if (dist(part.posX, part.posY, part.correctX, part.correctY) < 50) {
      parts[activeID].posX = part.correctX;
      parts[activeID].posY = part.correctY;
    }

    parts.push(parts[activeID]);
    parts.splice(activeID, 1);
    activeID = false;
  }
}

function mousePressed() {
  let clickedPieces = [];
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    if (
      mouseX >= parts[i].posX &&
      mouseX <= parts[i].posX + pieceSize &&
      mouseY >= parts[i].posY &&
      mouseY <= parts[i].posY + pieceSize
    ) {
      clickedPieces.push(i);

      //  parts.push(parts[activeID])
      //  break
    }
  }
  if (clickedPieces.length > 0) {
    console.log(clickedPieces);
    activeID = max(clickedPieces);
    console.log(activeID);
  }
}

function render_finished_puzzle(opacity = 255) {
  for (let i = 0; i < parts.length; i++) {
    push();
    translate(parts[i].correctX, parts[i].correctY);
    image(parts[i].img, 0, 0);
    // square(0,0,pieceSize)
    pop();
  }
  fill();
  rect(0, 0, pieceSize * cols, pieceSize * rows);
}

function render_pieces() {
  noFill();
  stroke(0);
  strokeWeight(2);
  for (let i = 0; i < parts.length; i++) {
    push();
    translate(parts[i].posX, parts[i].posY);
    image(parts[i].img, 0, 0);
    square(0, 0, pieceSize);
    pop();
  }
  if (activeID !== false) {
    push();
    translate(parts[activeID].posX, parts[activeID].posY);
    image(parts[activeID].img, 0, 0);
    //lighten selected
    noStroke();
    fill(255, 50);
    // strokeWeight(4)
    square(0, 0, pieceSize);
    //
    stroke(30);
    strokeWeight(4);
    square(0, 0, pieceSize);
    pop();
  }
}

function split_image(img, pieceSize2) {
  pieces = [];

  cols = floor(img.width / pieceSize2);
  rows = floor(img.height / pieceSize2);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const piece = img.get(
        x * pieceSize2,
        y * pieceSize2,
        pieceSize2,
        pieceSize2
      );

      pieces.push({
        img: piece,
        gridX: x,
        gridY: y,
        correctX: x * pieceSize2,
        correctY: y * pieceSize2,
        posX: random(0, width - pieceSize2),
        posY: random(0, height - pieceSize2),
        completed: false,
        active: false,
      });
    }
  }

  pieceSize = pieceSize2;

  return pieces;
}

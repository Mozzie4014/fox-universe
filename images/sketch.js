let img;

async function createCardSprite() {
  let id = floor(random(1, 124));

  img = await loadImage(`https://randomfox.ca/images/${id}.jpg`);
  sprite = createGraphics(img.width, img.height);
  sprite.image(img, 0, 0);
  return sprite;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  new_fox();
}

async function new_fox() {
  cardSprite = await createCardSprite();
}

function draw() {
  background(0);
  if (img) {
    translate((width - img.width) / 2, (height - img.height) / 2);

    image(sprite, 0, 0);
  }

  if (frameCount % 600 == 0) {
  }
}

function mousePressed() {
  background(3);
  new_fox();
}

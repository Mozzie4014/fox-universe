let img;
let fox_image_current
let fox_image_next
const image_speed = 600

async function preloadNewFox() {

  console.time("preload time")
  let id = floor(random(1, 124));
  

 let img = await loadImage(`https://randomfox.ca/images/${id}.jpg`);
  sprite = createGraphics(img.width, img.height);
  sprite.image(img, 0, 0);
 // console.log("preloaded")
  fox_image_next = img
  //console.timeEnd("preload time")
  return img;
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
 let temp = await preloadNewFox()
  nextFox();
}

function nextFox() {
  fox_image_current = fox_image_next
}

function draw() {
  background(0);
  let img = fox_image_current
   if (img) {
    let s = min(width / img.width, height / img.height);

    image(
      img,
      (width - img.width * s) / 2,
      (height - img.height * s) / 2,
      img.width * s,
      img.height * s
    );
  }

  if (frameCount % image_speed == 0) {
    nextFox()
   // console.log("changing fox")
  }
   if ((frameCount - 1)% image_speed == 0) {
   //  console.log("preloading fox")
   preloadNewFox()
  }
}

function mousePressed() {
  background(3);
  preloadNewFox();
}

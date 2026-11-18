let img;


async function preloadNewFox() {
  let id = floor(random(1, 124));
 let img = await loadImage(`https://randomfox.ca/images/${id}.jpg`);
  return img;
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
 background_fox = await preloadNewFox()
  facts = await loadJSON("facts.json")
  console.log(facts)
  noLoop()
}

function draw() {
 render_background()
  render_text()
}


function render_text() {
  let message
  let size
  fill(0)
  stroke(255)
  strokeWeight(1)
  textAlign(CENTER, CENTER)
  

  message = "Did you know"
  size = fitText(message, width * 0.8);
  textSize(size);
  text(message, width/2,height/2-(size*0.5))
  //message = null

    message = str(facts[floor(random(0,facts.length))])
  size = fitText(message, width * 0.9);
  textSize(size);
  text(message, width/2,height/2+(size*2))
  
}

function fitText(txt, max_width) {
  textSize(100); // reference size
  let measured_width = textWidth(txt);

  return 100 * (max_width / measured_width);
}

function render_background() {
 
  let img = background_fox
   if (img) {
    let s = max(width / img.width, height / img.height);

    image(
      img,
      (width - img.width * s) / 2,
      (height - img.height * s) / 2,
      img.width * s,
      img.height * s
    );
  }
    background(255,200);
}

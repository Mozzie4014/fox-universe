const imageSize = 400  // should be a power of 8
let fox
let fox1D = []
let source1D = []
let arrangement1D = []
let score
let lastScore = Infinity
const speed = 50

async function setup() {
  createCanvas(400, 400);
  fox = await loadImage("https://mozzie4014.github.io/fox-universe/converter/fox.png")
  source = await loadImage("https://mozzie4014.github.io/fox-universe/converter/source.jpg")
prepare_images()
  itterate()
  
frameRate(1)
}

function draw() {
  background(fox);
  run(3)
  render() 
  stroke(255)
  textSize(30)
  text("1543", 20, 50)
}

async function mousePressed() {


  
  await run(speed)
}

async function run(n) {

  for (let j = 0; j < n; j++) {
    itterate()
  }
  
}



function itterate() {
  let lastArrangement1D = arrangement1D
 shuffle(arrangement1D,true)
   let score = 0

for (let i = 0; i < imageSize*imageSize; i++) {
   let a = source1D[arrangement1D[i]]
   let b = fox1D[i]

  let error = Math.abs(a[0]-b[0]) +  Math.abs(a[1]-b[1]) +  Math.abs(a[2]-b[2]) +  Math.abs(a[3]-b[3])
  score += error
}

  diff = lastScore-score
  

//console.log("score:",score)
 // console.log("diff:", diff)

if (diff>0) {
  
} else if (true) {
  arrangement1D = lastArrangement1D
}

  lastArrangement1D = arrangement1D
  lastScore = score
  
}




function render() {
  loadPixels();
pixelDensity(1);
for (let i = 0; i < arrangement1D.length; i++) {
  let sourceIndex = arrangement1D[i];
  let col = source1D[sourceIndex];

  pixels[i * 4 + 0] = col[0]; // r
  pixels[i * 4 + 1] = col[1]; // g
  pixels[i * 4 + 2] = col[2]; // b
  pixels[i * 4 + 3] = 255;      // a
}

updatePixels();
}








function prepare_images() {

  
  
  const foxCenterX = 1350
  const foxCenterY = 900
  let tempFox = fox
  fox = tempFox.get(foxCenterX-(imageSize/2),foxCenterY-(imageSize/2), imageSize, imageSize)

  fox.loadPixels();

for (let y = 0; y < fox.height; y++) {
  for (let x = 0; x < fox.width; x++) {

    let index = (x + y * fox.width) * 4;

    let r = fox.pixels[index + 0];
    let g = fox.pixels[index + 1];
    let b = fox.pixels[index + 2];
    let a = fox.pixels[index + 3];

    fox1D.push([r, g, b, a]);
  }
}

  console.log(fox1D[0])
  
  const sourceCenterX = 370
  const sourceCenterY = 460
  let tempSource = source
  source = tempSource.get(sourceCenterX-(imageSize/2),sourceCenterY-(imageSize/2), imageSize, imageSize)

  source.loadPixels();

for (let y = 0; y < source.height; y++) {
  for (let x = 0; x < source.width; x++) {

    let index = (x + y * source.width) * 4;

    let r = source.pixels[index + 0];
    let g = source.pixels[index + 1];
    let b = source.pixels[index + 2];
    let a = source.pixels[index + 3];

    source1D.push([r, g, b, a]);
  }
}

  

  for (let i = 0; i < imageSize*imageSize; i++) {
    arrangement1D.push(i)
  }
  shuffle(arrangement1D,true)
}














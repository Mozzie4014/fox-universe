const imageSize = 400  // should be a power of 8
let fox
let fox1D = []
let source1D = []
let arrangement1D = []
let score
let lastScore = Infinity
const speed = 500

async function setup() {
  createCanvas(400, 400);
  fox = await loadImage("https://mozzie4014.github.io/fox-universe/converter/fox.png")
  source = await loadImage("https://mozzie4014.github.io/fox-universe/converter/source.jpg")
prepare_images()
  itterate()
  
frameRate(60)
}

function draw() {
  //background(fox);
  run(200)
  render() 
  stroke(255)
  textSize(30)
  text(speed, 20, 50)
}

async function mousePressed() {


  
  await run(speed)
  render()
}

async function run(n) {

  for (let j = 0; j < n; j++) {
    itterate(500)
  }
  
}


function itterate(numSwaps) {
  let swapsApplied = [];
  let totalDelta = 0;

  for (let i = 0; i < numSwaps; i++) {
    let idxA = floor(random(0, arrangement1D.length));
    let idxB = floor(random(0, arrangement1D.length));
    if (idxA === idxB) continue;

    // Calculate error before swapping positions idxA and idxB
    let errorBefore = getPixelError(idxA, arrangement1D[idxA]) + 
                      getPixelError(idxB, arrangement1D[idxB]);

    // Perform the swap in arrangement1D
    let temp = arrangement1D[idxA];
    arrangement1D[idxA] = arrangement1D[idxB];
    arrangement1D[idxB] = temp;

    // Calculate error after the swap
    let errorAfter = getPixelError(idxA, arrangement1D[idxA]) + 
                     getPixelError(idxB, arrangement1D[idxB]);

    totalDelta += (errorAfter - errorBefore);
    swapsApplied.push({ idxA, idxB });
  }

  // Accept if it improves or stays neutral, otherwise revert
  if (totalDelta <= 0) {
    lastScore += totalDelta;
  } else {
    // Revert swaps in reverse order
    for (let i = swapsApplied.length - 1; i >= 0; i--) {
      let s = swapsApplied[i];
      let temp = arrangement1D[s.idxA];
      arrangement1D[s.idxA] = arrangement1D[s.idxB];
      arrangement1D[s.idxB] = temp;
    }
  }
}

// Helper to evaluate error for a specific screen position vs source pixel
function getPixelError(pixelIndex, sourceIndex) {
  let a = source1D[sourceIndex]; // Source pixel color
  let b = fox1D[pixelIndex];     // Target image pixel color
  return Math.abs(a[0] - b[0]) + 
         Math.abs(a[1] - b[1]) + 
         Math.abs(a[2] - b[2]);  // Add a[3] if using alpha
}



function ittrer3ate() {
   lastArrangement1D = arrangement1D
// shuffle(arrangement1D,true)
   let score = 0

for (let i = 0; i < 20; i++) {
    let pos = floor(random(0,arrangement1D.length))
   let a = source1D[arrangement1D[pos]]
   let b = fox1D[pos]

  let error = Math.abs(a[0]-b[0]) +  Math.abs(a[1]-b[1]) +  Math.abs(a[2]-b[2]) +  Math.abs(a[3]-b[3])
  score += error
}

  diff = lastScore-score
  

//console.log("score:",score)
// console.log("diff:", diff)
 console.log(diff)
if (diff>0) {
 
} else if (true) {
  arrangement1D = lastArrangement1D
}

  lastArrangement1D = arrangement1D
  lastScore = score
  
}

function itterat4e() {
  // 1. Pick two random indices and swap them to test a change
  let idxA = floor(random(0, arrangement1D.length));
  let idxB = floor(random(0, arrangement1D.length));
  
  // Swap them temporarily
  let temp = arrangement1D[idxA];
  arrangement1D[idxA] = arrangement1D[idxB];
  arrangement1D[idxB] = temp;

  // 2. Calculate the new score with the swap
  let score = 0;
  for (let p = 0; p < 9; p++) {
    let i = floor(random(0,arrangement1D.length))
    let a = source1D[arrangement1D[i]];
    let b = fox1D[i];
    let error = Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]) + Math.abs(a[2]-b[2]) + Math.abs(a[3]-b[3]);
    score += error;
  }

  // 3. Compare with lastScore (we want to MINIMIZE the error score)
  let diff = lastScore - score;

  if (diff > 0) {
    // If score improved (error went down), keep the change!
    lastScore = score;
  } else {
    // Otherwise, revert the swap
    arrangement1D[idxA] = arrangement1D[idxB];
    arrangement1D[idxB] = temp;
  }
}






function itter4ate(numSwaps) {
  let swapsApplied = [];
  let totalDelta = 0;

  // 1. Apply n random swaps and calculate their exact error impact (delta)
  for (let i = 0; i < numSwaps; i++) {
    let idxA = floor(random(0, arrangement1D.length));
    let idxB = floor(random(0, arrangement1D.length));
    
    if (idxA === idxB) continue; // Skip if it's the exact same pixel

    // Get the destination target coordinates in the grid/array
    let targetIdxA = idxA;
    let targetIdxB = idxB;

    // Calculate error contribution BEFORE the swap for these two positions
    let errorBefore = getPixelError(targetIdxA, arrangement1D[targetIdxA]) + 
                      getPixelError(targetIdxB, arrangement1D[targetIdxB]);

    // Perform the swap in the array
    let temp = arrangement1D[targetIdxA];
    arrangement1D[targetIdxA] = arrangement1D[targetIdxB];
    arrangement1D[targetIdxB] = temp;

    // Calculate error contribution AFTER the swap for these two positions
    let errorAfter = getPixelError(targetIdxA, arrangement1D[targetIdxA]) + 
                     getPixelError(targetIdxB, arrangement1D[targetIdxB]);

    // Accumulate the net change in score (Negative means improvement!)
    totalDelta += (errorAfter - errorBefore);

    // Save swap details so we can undo them if the batch is rejected
    swapsApplied.push({ targetIdxA, targetIdxB });
  }

  // 2. Evaluate the net change
  if (totalDelta < 0) {
    // Improvement! Update our global score tracker without scanning 160k pixels
    lastScore += totalDelta;
  } else {
    // Bad move: Revert all the swaps in reverse order
    for (let i = swapsApplied.length - 1; i >= 0; i--) {
      let s = swapsApplied[i];
      let temp = arrangement1D[s.targetIdxA];
      arrangement1D[s.targetIdxA] = arrangement1D[s.targetIdxB];
      arrangement1D[s.targetIdxB] = temp;
    }
  }
}

// Helper function to get the color error for a single pixel slot
function getPixelError(pixelIndex, sourceIndex) {
  let a = source1D[sourceIndex];
  let b = fox1D[pixelIndex];
  return Math.abs(a[0] - b[0]) + 
         Math.abs(a[1] - b[1]) + 
         Math.abs(a[2] - b[2]) + 
         Math.abs(a[3] - b[3]);
}


function render() {
  loadPixels();
pixelDensity(fox.width/width);
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














const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

document.querySelector('.selector').addEventListener('change', (event)=>{
  if(event.target.value === 'h-fractal'){
    document.querySelector('.info').innerHTML = `<div class="inputes">
    <label>Color</label>
    <input type="color" class="color">
    <label>X</label>
    <input type="number" class="x">
    <label>Y</label>
    <input type="number" class="y">
    <label>Depth</label>
    <input type="number" class="depth">
    <label>Scale</label>
    <input type="number" class="scale">
  </div>`
  } else if(event.target.value === 't-fractal'){
    document.querySelector('.info').innerHTML = `<div class="inputes">
    <label>Color</label>
    <input type="color" class="color">
    <label>X</label>
    <input type="number" class="x">
    <label>Y</label>
    <input type="number" class="y">
    <label>Depth</label>
    <input type="number" class="depth">
    <label>Scale</label>
    <input type="number" class="scale">
  </div>`
  } else if(event.target.value === 'newton-fractal'){
    document.querySelector('.info').innerHTML = `<div class="inputes">
    <label>Color</label>
    <select class="color-selector">
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="colorful">Colorful</option>
    </select>
    <label>Number of iterations</label>
    <input type="number" class="iterations">
    <label>C real</label>
    <input type="number" class="c-real">
    <label>C imaginary</label>
    <input type="number" class="c-imaginary">
  </div>`
  }
  
})
let fractal = document.querySelector('.selector')
document.querySelector('.draw-btn').addEventListener('click', ()=>{
  if(fractal.value === 'h-fractal'){
    drawH();
  } else if(fractal.value === 't-fractal'){
    drawT();
  } else if(fractal.value === 'newton-fractal'){
    const cReal = document.querySelector('.c-real').value;
    const cImaginary = document.querySelector('.c-imaginary').value;
    const colorScheme = document.querySelector('.color-selector').value;
    const maxIterations = document.querySelector('.iterations').value;
    console.log(cReal, cImaginary, colorScheme, maxIterations)
    drawNewtonFractal(cReal, cImaginary, colorScheme, maxIterations);
  }
})

function newtonMethod(x, y, cReal, cImaginary, maxIterations, colorScheme) {
  let z = math.complex(x, y);
  const tolerance = 0.01;
  let i;
  let prevZ;
  for (i = 0; i < maxIterations; i++) {
    const fz = math.add(math.pow(z, 4), math.complex(cReal, cImaginary));
    const fzDerivative = math.multiply(4, math.pow(z, 3));

    prevZ = z;
    z = math.subtract(z, math.divide(fz, fzDerivative));

    if (math.abs(math.subtract(z, prevZ)).valueOf() < tolerance) {
      break;
    }
  }

  let color = i;
  if (colorScheme === 'red') {
    let saturation = (color / maxIterations) * 100;
    ctx.fillStyle = (color === maxIterations) ? '#000' : 'hsl(0, 100%, ' + saturation + '%)';
  } else if (colorScheme === 'green') {
    let green = Math.floor((color % 255));
    ctx.fillStyle = `rgb(${0}, ${green}, ${0})`;
  } else {
    const intensity = (i / maxIterations) * 255;
    const hue = intensity * 2.55;
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  }

  const canvasX = (x + 2) * (canvas.width/4);
  const canvasY = (y + 2) * (canvas.height/4);

  ctx.fillRect(canvasX, canvasY, 1, 1);

  return z;
}

function drawNewtonFractal(cReal, cImaginary, colorScheme, maxIterations) {
    for (let y = 0; y < canvas.height; y++) {
      // console.log(y)
        for (let x = 0; x < canvas.width; x++) {
            const real = (x - canvas.width / 2) / (canvas.width / 4);
            const imaginary = (y - canvas.height / 2) / (canvas.height / 4);
            
            newtonMethod(real, imaginary, cReal, cImaginary, maxIterations, colorScheme);
        }
    }
}

//////////////////////////////

function drawHTree(x, y, length, depth) {
  if (depth === 0) return;

  const halfLength = length/2;
  const x0 = x - halfLength/2;
  const x1 = x + halfLength/2;
  const y0 = y - halfLength/2;
  const y1 = y + halfLength/2;

  ctx.beginPath();
  ctx.moveTo(x0, y);
  ctx.lineTo(x1, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0, y1);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x1, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  drawHTree(x0, y0, halfLength, depth - 1);
  drawHTree(x0, y1, halfLength, depth - 1);
  drawHTree(x1, y0, halfLength, depth - 1);
  drawHTree(x1, y1, halfLength, depth - 1);
}

function drawH() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = document.querySelector('.scale').value;
  const depth = document.querySelector('.depth').value;
  const x = document.querySelector('.x').value;
  const y = document.querySelector('.y').value;
  ctx.fillStyle = document.querySelector('.color').value;
  if (!scale || !depth || !x || !y){
    alert('Fill all fields!')
  } else{
    const initialSize = Math.min(canvas.width, canvas.height) * scale;
    drawHTree(canvas.width/2 + x*20, canvas.height/2 - y*20, initialSize, depth);
  }
}


// //////////

function drawTFractal(x, y, length, depth) {
  if (depth === 0) return;

  ctx.fillRect(x - length / 2, y - length / 2, length, length);

  const halfLength = length / 2;
  const topLeftX = x - length / 2;
  const topLeftY = y - length / 2;
  const topRightX = x + length / 2;
  const topRightY = y - length / 2;
  const bottomLeftX = x - length / 2;
  const bottomLeftY = y + length / 2;
  const bottomRightX = x + length / 2;
  const bottomRightY = y + length / 2;

  drawTFractal(topLeftX, topLeftY, halfLength, depth - 1);
  drawTFractal(topRightX, topRightY, halfLength, depth - 1);
  drawTFractal(bottomLeftX, bottomLeftY, halfLength, depth - 1);
  drawTFractal(bottomRightX, bottomRightY, halfLength, depth - 1);
}

function drawT() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = document.querySelector('.scale').value * 0.5;
  const depth = document.querySelector('.depth').value;
  const x = document.querySelector('.x').value;
  const y = document.querySelector('.y').value;
  ctx.fillStyle = document.querySelector('.color').value;
  if (!scale || !depth || !x || !y){
    alert('Fill all fields!')
  } else{
    const initialSize = Math.min(canvas.width, canvas.height) * scale;
    drawTFractal(canvas.width/2 + x*20, canvas.height/2 - y*20, initialSize, depth);
  }
}

function downloadCanvasAsImage() {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'canvas_image.png';
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.querySelector('.download-btn').addEventListener('click', downloadCanvasAsImage);
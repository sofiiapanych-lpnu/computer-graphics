let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let segmentLength = 20;

function drawSystemOfCoordinates(){
  context.beginPath();
  context.moveTo(0, canvas.height/2);
  context.lineTo(canvas.width, canvas.height/2);
  context.fillStyle = "#000";
  context.stroke();
  
  context.beginPath();
  context.moveTo(canvas.width/2, 0);
  context.lineTo(canvas.width/2, canvas.height);
  context.fillStyle = "#000";
  context.stroke();

  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;

  let startX = Math.floor(-centerX / segmentLength);
  let endX = Math.ceil((canvas.width - centerX) / segmentLength);
  let startY = Math.floor(-centerY / segmentLength);
  let endY = Math.ceil((canvas.height - centerY) / segmentLength);

  for(let i = startX; i <= endX; i++){
    if(i != 0){
      let x = centerX + i * segmentLength;
      context.beginPath();
      context.moveTo(x, centerY + 5);
      context.lineTo(x, centerY - 5);
      context.stroke();
      context.fillText(`${i}`, x - 3, centerY + 15);
    }
  }
  context.fillText("0", centerX - 7, centerY + 10);
  drawArrow(context, centerX, centerY, canvas.width, centerY, 10);
  for(let i = startY; i <= endY; i++){
    if(i != 0){
      let y = centerY - i * segmentLength;
      context.beginPath();
      context.moveTo(centerX - 5, y);
      context.lineTo(centerX + 5, y);
      context.stroke();
      context.fillText(`${i}`, centerX + 10, y + 3);
    }
  }
  drawArrow(context, centerX, canvas.height, centerX, 0, 10);

  context.fillStyle = "#000";
  context.font = "14px Arial";
  context.fillText("X", canvas.width - 15, centerY + 20);
  context.fillText("Y", centerX + 10, 20);
}
function drawArrow(ctx, x0, y0, x1, y1, size){
  let angle = Math.atan2(y1-y0, x1-x0);
  ctx.save();
  ctx.translate(x1, y1);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-size, -size / 2);
  ctx.lineTo(-size, size / 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.restore();
}

function matrixMultiply(matrix1, matrix2) {
  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrix1[0].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

// drawSystemOfCoordinates();

function drawEquilateralTriangle(x1, y1, x2, y2, x3, y3) {
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fill();
}

let C = [[-5,0,1],
        [5,0,1],
        [0,8.66,1]]

function getCenter(){
  const centerX = (C[0][0] + C[1][0] + C[2][0]) / 3;
  const centerY = (C[0][1] + C[1][1] + C[2][1]) / 3;
  return {centerX, centerY}
}

function convert(coords){
  let x = coords.x * segmentLength
  x  = x + canvas.width/2; 
  let y = coords.y * segmentLength
  y = -y  + canvas.height/2;
  return {x,y}
}

function drawTriangle(){
  let C1 = convert({x:C[0][0], y:C[0][1]})
  let C2 = convert({x:C[1][0], y:C[1][1]})
  let C3 = convert({x:C[2][0], y:C[2][1]})
  //console.log(C)
  drawEquilateralTriangle(C1.x, C1.y, C2.x, C2.y, C3.x, C3.y)
}

function rotateMatrix(){
  return [
    [Math.cos(angle), Math.sin(angle), 0],
    [-Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 1],
  ]
}
function translateMatrix(){
  return [
    [1, 0, 0],
    [0, 1, 0],
    [moveX, moveY, 1],
  ]
}
let moveX = 0.1;
let moveY = 0.1;
let angle = 10;
let numIterations = 100;
let counter = 0;
let isRising = true;

let N;
let M;
let alpha;

function calculate(){
  moveX = N/100;
  moveY = M/100;
  angle = (alpha * Math.PI / 180) / 100;
}

let isAnimating = false;

function animate() {
  if (isAnimating) {
    //console.log("started");
    if (isRising) {
      counter++;
    } else {
      counter--;
    }
    if (counter >= numIterations || counter <= 0) {
      isRising = !isRising;
      angle = -angle;
      moveX = -moveX;
      moveY = -moveY;
    }
    C = rotateNotElem();
    C = matrixMultiply(C, translateMatrix());
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSystemOfCoordinates();
    drawTriangle();

    requestAnimationFrame(animate);
  }
}


function rotateNotElem(){ //не елементарне перетворення
  let {centerX, centerY} = getCenter();
  let movecenterMatr = [[1,0,0],[0,1,0],[-centerX,-centerY,1]]
  let backcenterMatr = [[1,0,0],[0,1,0],[centerX,centerY,1]]
  C = matrixMultiply(C, movecenterMatr);
  C = matrixMultiply(C, rotateMatrix());
  C = matrixMultiply(C, backcenterMatr);
  return C;
}


document.querySelector('.draw-btn').addEventListener('click', ()=>{
  context.clearRect(0, 0, canvas.width, canvas.height);
  let segmentLengthInput = document.getElementById("segmentLength");
  segmentLength = parseFloat(segmentLengthInput.value);
  drawSystemOfCoordinates();
  
  let topX = parseFloat(document.getElementById("topX").value)
  let topY = parseFloat(document.getElementById("topY").value)
  let leftX = parseFloat(document.getElementById("leftX").value)
  let leftY = parseFloat(document.getElementById("leftY").value)
  let rightX = parseFloat(document.getElementById("rightX").value)
  let rightY = parseFloat(document.getElementById("rightY").value)

  N = parseFloat(document.getElementById("moveX").value);
  M = parseFloat(document.getElementById("moveY").value);
  alpha = parseFloat(document.getElementById("angle").value);

  if (isNaN(topX) || isNaN(topY) || isNaN(leftX) || isNaN(leftY) || isNaN(rightX) || isNaN(rightY)) {
    alert("Невірні координати!");
    return;
  }
  const side1 = Math.sqrt(Math.pow(leftX - topX, 2) + Math.pow(leftY - topY, 2));
  const side2 = Math.sqrt(Math.pow(rightX - leftX, 2) + Math.pow(rightY - leftY, 2));
  const side3 = Math.sqrt(Math.pow(topX - rightX, 2) + Math.pow(topY - rightY, 2));

  const tolerance = 0.01;
  const areSidesEqual = Math.abs(side1 - side2) < tolerance && Math.abs(side2 - side3) < tolerance;

  if (!areSidesEqual) {
    alert("Трикутник не є рівностороннім!");
    return;
  }
  // C = [[-5,0,1],
  //   [5,0,1],
  //   [0,8.66,1]]
  C = [[leftX, leftY, 1],
      [rightX, rightY, 1],
      [topX, topY, 1]]
  drawTriangle()
})

document.querySelector('.start-btn').addEventListener('click', ()=>{
  isAnimating = true
  calculate()
  animate()
  document.querySelector(".start-btn").disabled = true;
  document.querySelector(".stop-btn").disabled = false;
})

document.querySelector('.stop-btn').addEventListener('click', ()=>{
  isAnimating = false
  document.querySelector(".start-btn").disabled = false;
  document.querySelector(".stop-btn").disabled = true;
})


document.querySelector('.downloadM-btn').addEventListener('click', ()=>{
  let result = rotateNotElem();
  result = matrixMultiply(result, translateMatrix());
  console.log(result)
  const fileContent = result.map(row => row.join(',')).join('\n');
    const blob = new Blob([fileContent], { type: 'text/plain' });

    const file = new File([blob], 'result_matrix.txt', { type: 'text/plain' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = file.name;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
})

document.querySelector('.download-btn').addEventListener('click', () => {
  const canvas = document.querySelector('canvas');
  const image = canvas.toDataURL('image/png');

  const downloadLink = document.createElement('a');
  downloadLink.href = image;
  downloadLink.download = 'canvas_image.png';

  document.body.appendChild(downloadLink);
  downloadLink.click();

  document.body.removeChild(downloadLink);
});

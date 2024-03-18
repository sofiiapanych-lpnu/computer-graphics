let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let segmentLength = 20;
let start = -16;
let end = 16;

let tStart = 0;
let tEnd = 1;
let tStep = 0.001;

let PointId = 1;
const list = document.querySelector('.input-values');
drawSystemOfCoordinates();

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

  for(let i=start; i<=end; i++){
    if(i!=0){
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
  for(let i=start; i<=end; i++){
    if(i!=0){
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
function convertPoint(point){
  return {x: canvas.width/2 + point.x*segmentLength, y: canvas.height/2 - point.y*segmentLength}
}

document.querySelector(".add-values-btn").addEventListener("click", ()=>{
  
  let node = document.createElement('div');
  node.id  = PointId;
  node.innerHTML =`
  <input type="number" placeholder="X" class="input-x">
  <input type="number" placeholder="Y" class="input-y">
  <button class="delete-values-btn" data-id="${PointId}">-</button>
  `; 

  node.querySelector(".delete-values-btn").addEventListener('click',(event)=>{
    let id = event.target.dataset.id;
    list.removeChild(document.getElementById(`${id}`));
  });
  PointId +=1;
  list.appendChild(node);
});

document.querySelector(".submit-values-btn").addEventListener("click", ()=>{
  if(getPoints().length<2){
    alert("There should be at least 2 points!")
  }
  const step = Number(document.querySelector(".input-step").value)
  const start = Number(document.querySelector(".input-start").value)
  const end = Number(document.querySelector(".input-end").value)
  if(!(step >= 0 && step <= 1) || !(start >= 0 && start <= 1) || !(end >= 0 && end <= 1) || !(end > start)){
    alert("Info about step/interval is incorrect!\nIt should be [0;1]")
  }
  else{
    tStep = step
    tStart = start
    tEnd = end
    console.log(tStep, tStart, tEnd)

    const isChecked = document.querySelector(".input-checkbox").checked;

    context.clearRect(0, 0, canvas.width, canvas.height)
    drawSystemOfCoordinates()
    if(isChecked){
      drawBezierMatr(getPoints())
      //drawBezierMatr([{x:-3, y:-6}, {x:9.8, y:3}, {x:10, y:7.7}, {x:-3, y:11}, {x:-8, y:10}, {x:-6, y:4}])
    } else {
      //drawBezier([{x:-3, y:-6}, {x:9.8, y:3}, {x:10, y:7.7}, {x:-3, y:11}, {x:-8, y:10}, {x:-6, y:4}])
      drawBezier(getPoints())
    }
  }
})


function getPoints() {
  const inputValuesDiv = document.querySelector('.input-values');
  const inputX = inputValuesDiv.getElementsByClassName('input-x');
  const inputY = inputValuesDiv.getElementsByClassName('input-y');

  let pointsArray = [];

  for (let i = 0; i < inputX.length; i++) {
    const xValue = inputX[i].value;
    const yValue = inputY[i].value;
    const pointId = `${i + 1}`;

    pointsArray.push({ id: pointId, x: parseInt(xValue), y: parseInt(yValue) });
  }

  //console.log(pointsArray);
  return pointsArray;
}

////////ПАРАМЕТРИЧНА КРИВА///////// 
function factorial(number){
  if (number===0 || number===1) {
    return 1
  } else {
    return number*factorial(number-1)
  }
}

function basisF(i, n, t){
  let nFactorial = factorial(n)
  let iFactorial = factorial(i)
  let diffFactorial = factorial(n-i)
  return nFactorial * Math.pow(t,i) * Math.pow((1-t), (n-i)) / (iFactorial * diffFactorial)
}
function multiplyPoints(point, basis){
  return {x: point.x*basis, y: point.y*basis}
}
function sumPoints(point, point2){
  return {x: point.x+point2.x, y: point.y+point2.y}
}
function calculatePoint(points, n, t){
  let point = {x:0,y:0}
  for(let i=0; i<n; i++){
    point = sumPoints(point, multiplyPoints(points[i], basisF(i, n-1, t)))
  }
  return point
}

function drawBezier(points){
  context.beginPath()
  for (let i = 0; i < points.length; i++) {
    let controlPoint = convertPoint(points[i])
    context.arc(controlPoint.x, controlPoint.y, 1, 0, 2 * Math.PI)
    context.strokeStyle = 'rgba(173, 20, 87, 0.5)'
    context.stroke()
  }
  let controlPoint = convertPoint(points[0])
  context.arc(controlPoint.x, controlPoint.y, 1, 0, 2 * Math.PI)
  context.strokeStyle = 'rgba(173, 20, 87, 0.5)'
  context.stroke()

  let firstPoint = true
  context.beginPath()
  for(let t = tStart; t<tEnd; t+=tStep){
    let point = calculatePoint(points, points.length, t)
    let coordinates = convertPoint(point)
    if(firstPoint){
      context.moveTo(coordinates.x, coordinates.y)
      firstPoint = false
    }
    context.lineTo(coordinates.x, coordinates.y)
  }
  context.lineWidth = 2
  context.strokeStyle = 'black'
  context.stroke()
  context.lineWidth = 1
}

///////МАТРИЧНИЙ МЕТОД////////
function binomialCoef(n, i){
  let nFactorial = factorial(n)
  let iFactorial = factorial(i)
  let diffFactorial = factorial(n-i)
  return nFactorial/(iFactorial*diffFactorial)
}

function formMatrixN(n) {
  let matrix = []
  for (let i = 0; i <= n; i++) {
    matrix[i] = []
      for (let j = 0; j <= n; j++) {
        if (n - j >= i) {
          const coefficient = binomialCoef(n, i) * binomialCoef(n - i, n - i - j)
          matrix[i][j] = (n - i - j) % 2 ? -coefficient : coefficient
        } else {
          matrix[i][j] = 0
        }
      }
  }
  return matrix
}

function formTMatrix(n, t){
  let matrix = []
  for(let i = n; i >= 0; i--){
  matrix[i] =  Math.pow(t, n-i)
  }
  return matrix
}


function multiplyMatrix(matrixT, matrixC) {
  let matrix =[]
  for(let i = 0; i < matrixT.length; i++){
    matrix[i] = 0;
    for(let j = 0; j < matrixT.length; j++){
      matrix[i] += matrixT[j] * matrixC[i][j]
    }
  }
  return matrix
}

function multiplyMatrixTNPoint(matrix, pointMatrix) {
  let point = { x:0, y:0 };
  for (let i = 0; i < matrix.length; i++) {
    point = sumPoints(point, multiplyPoints(pointMatrix[i], matrix[i]))
  }
  return point
}

function drawBezierMatr(points) {
  context.beginPath()
  for (let i = 0; i < points.length; i++) {
    let controlPoint = convertPoint(points[i])
    context.arc(controlPoint.x, controlPoint.y, 1, 0, 2 * Math.PI)
    context.strokeStyle = 'rgba(173, 20, 87, 0.5)'
    context.stroke()
  }
  let controlPoint = convertPoint(points[0])
  context.arc(controlPoint.x, controlPoint.y, 1, 0, 2 * Math.PI)
  context.strokeStyle = 'rgba(173, 20, 87, 0.5)'
  context.stroke()

  let matrixN = formMatrixN(points.length - 1);
  calculateIndividual(matrixN)
console.log(matrixN)
  let firstPoint = true
  context.beginPath()
  for(let t = tStart; t<tEnd; t+=tStep){
    let matrixT = formTMatrix(matrixN.length-1, t)
    let matrixTN = multiplyMatrix(matrixT, matrixN)
    let point = multiplyMatrixTNPoint(matrixTN, points)
    let coordinates = convertPoint(point)
    if(firstPoint){
      context.moveTo(coordinates.x, coordinates.y)
      firstPoint = false
    }
    context.lineTo(coordinates.x, coordinates.y)
  }
  context.lineWidth = 2
  context.strokeStyle = 'black'
  context.stroke()
  context.lineWidth = 1
}

function calculateIndividual(matrix) {
  let coefficients = []
  let zeroElements = []
  let sumFirstRow = 0
  let sumFirstColumn = 0

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== 0) {
        coefficients.push(`Coefficient: ${matrix[i][j]}, Position: ${i}, ${j}`)
      } else {
        zeroElements.push(`Position: ${i}, ${j}`)
      }
      if (i === 0) {
        sumFirstRow += matrix[i][j]
      }
      if (j === 0) {
        sumFirstColumn += matrix[i][j]
      }
    }
  }

  console.log("Non-zero coefficients:", coefficients);
  console.log("Zero elements:", zeroElements);
  console.log("Sum of the elements in the first row:", sumFirstRow);
  console.log("Sum of the elements in the first column:", sumFirstColumn);

  let outputDiv = document.querySelector('.output')

  let nonZeroCoefParagraph = document.createElement('p')
  nonZeroCoefParagraph.className = 'non-zero-coef'
  nonZeroCoefParagraph.textContent = 'Non-zero coefficients:'
  nonZeroCoefParagraph.style.fontWeight = 'bold'
  outputDiv.appendChild(nonZeroCoefParagraph)

  coefficients.forEach((coefficient) => {
    let coefficientParagraph = document.createElement('p')
    coefficientParagraph.textContent = coefficient
    outputDiv.appendChild(coefficientParagraph)
  })

  let zeroCoefParagraph = document.createElement('p')
  zeroCoefParagraph.className = 'zero-coef'
  zeroCoefParagraph.textContent = 'Zero elements:'
  zeroCoefParagraph.style.fontWeight = 'bold'
  outputDiv.appendChild(zeroCoefParagraph)

  zeroElements.forEach((zeroElement) => {
    let zeroElementParagraph = document.createElement('p')
    zeroElementParagraph.textContent = zeroElement
    outputDiv.appendChild(zeroElementParagraph)
  })

  let firstRowParagraph = document.createElement('p')
  firstRowParagraph.className = 'first-row'
  firstRowParagraph.textContent = 'Sum of the elements in the first row: ' + sumFirstRow
  firstRowParagraph.style.fontWeight = 'bold'

  let firstColumnParagraph = document.createElement('p')
  firstColumnParagraph.className = 'first-column'
  firstColumnParagraph.textContent = 'Sum of the elements in the first column: ' + sumFirstColumn
  firstColumnParagraph.style.fontWeight = 'bold'

  outputDiv.appendChild(firstRowParagraph)
  outputDiv.appendChild(firstColumnParagraph)
}
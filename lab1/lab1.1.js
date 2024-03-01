// // Get the canvas element
// let canvas = document.getElementById("myCanvas");
// let context = canvas.getContext("2d");

// // Draw x-axis
//   context.beginPath();
//   context.moveTo(0, canvas.height / 2);
//   context.lineTo(canvas.width, canvas.height / 2);
//   context.strokeStyle = "#000"; // Black color
//   context.stroke();

//   // Draw y-axis
//   context.beginPath();
//   context.moveTo(canvas.width / 2, 0);
//   context.lineTo(canvas.width / 2, canvas.height);
//   context.stroke();

// // Draw a rectangle
// context.fillStyle = "#FF0000"; // Red color
//   context.fillRect(0, 0, 100, 50); // x, y, width, height

//   // Draw a line
//   context.beginPath();
//   context.moveTo(200, 50);
//   context.lineTo(300, 100);
//   context.strokeStyle = "#00FF00"; // Green color
//   context.stroke();

//   let rectWidth = 100;
//   let rectHeight = 50;

//   // Calculate the position to center the rectangle
//   let centerX = canvas.width / 2;
//   let centerY = canvas.height / 2;

//   // Your custom coordinates
//   let customX = 10;
//   let customY = 0;

//   // Convert custom coordinates to canvas coordinates
//   let canvasX = centerX + customX;
//   let canvasY = centerY - customY;

//   // Draw a rectangle at the custom coordinates
//   context.fillStyle = "#FF0000"; // Red color
//   context.fillRect(canvasX, canvasY, rectWidth, rectHeight); // x, y, width, height
var canvas = document.getElementById("system-of-coordinates");
  var context = canvas.getContext("2d");

  // Set up custom coordinates
  var unitSegment = 25; // Adjust the unit segment length
  var start = -10; // Start from -5 units
  var end = 10; // End at 5 units

  // Set up the canvas center
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  
  // Your custom coordinates
  let customX = 25 * 4;
  let customY = 25 * 4;

  // Convert custom coordinates to canvas coordinates
  let canvasX = centerX + customX;
  let canvasY = centerY - customY;

  var rectWidth = 50;
  var rectHeight = 50;

  // Draw a rectangle at the custom coordinates
  context.fillStyle = "#FF0000"; // Red color
  context.fillRect(canvasX, canvasY, rectWidth, rectHeight); // x, y, width, height

  // Draw a blue circle around the red rectangle
  var circleRadius = Math.sqrt(rectWidth * rectWidth + rectHeight * rectHeight)/2;
  context.beginPath();
  context.arc(canvasX + rectWidth / 2, canvasY + rectHeight / 2, circleRadius, 0, 2 * Math.PI);
  context.strokeStyle = "#0000FF"; // Blue color
  context.stroke();


  // Draw x-axis
  context.beginPath();
  context.moveTo(0, centerY);
  context.lineTo(canvas.width, centerY);
  context.fillStyle = "#000";
  //context.strokeStyle = "#000"; чомусь з тим міняє колір а з верхнім все ок?
  context.stroke();
  drawArrowhead(context, 0, centerY, canvas.width, centerY, 10);

  // Draw y-axis
  context.beginPath();
  context.moveTo(centerX, canvas.height);
  context.lineTo(centerX, 0);
  context.stroke();
  drawArrowhead(context, centerX, canvas.height, centerX, 0, 10);

  // Draw markings and captions on the x-axis
  for (var i = start; i <= end; i++) {
    if(i!=0){
      var x = centerX + i * unitSegment;
      context.beginPath();
      context.moveTo(x, centerY - 5);
      context.lineTo(x, centerY + 5);
      context.stroke();
      context.fillText(i.toString(), x - 5, centerY + 20);
    }
  }
  context.fillText("0", centerX - 7, centerY + 12);

  // Draw markings and captions on the y-axis
  for (var i = start; i <= end; i++) {
    if(i!=0){
      var y = centerY - i * unitSegment;
      context.beginPath();
      context.moveTo(centerX - 5, y);
      context.lineTo(centerX + 5, y);
      context.stroke();
      context.fillText(i.toString(), centerX + 10, y + 5);
    }
  }

  // Add axis labels
  context.fillStyle = "#000";
  context.font = "14px Arial";
  context.fillText("X", canvas.width - 15, centerY + 20);
  context.fillText("Y", centerX + 10, 20);


  // function drawArrowhead(context, x, y, size) {
  //   context.save();

  //   // Move the origin to the tip of the arrow
  //   context.translate(x, y);

  //   // Rotate the arrow
  //   var angle = Math.atan2(100 - y, 350 - x);
  //   context.rotate(angle);

  //   // Draw the arrowhead
  //   context.beginPath();
  //   context.moveTo(0, 0);
  //   context.lineTo(-size, -size / 2);
  //   context.lineTo(-size, size / 2);
  //   context.fillStyle = "#000";
  //   context.fill();

  //   context.restore();
  // }

  function drawArrowhead(context, x1, y1, x2, y2, size) {
    // Calculate angle
    var angle = Math.atan2(y2 - y1, x2 - x1);

    // Draw the arrowhead
    context.save();
    context.translate(x2, y2);
    context.rotate(angle);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(-size, -size / 2);
    context.lineTo(-size, size / 2);
    context.fillStyle = "#0000FF";
    context.fill();

    context.restore();
}





////////////////


// document.querySelector(".div-system-of-coordinates").innerHTML += `<canvas width="700" height="700"></canvas>`

drawSystemOfCoordinates();

function drawSystemOfCoordinates(){
  let canvas = document.querySelector("canvas");
  let context = canvas.getContext("2d");
  
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
    
  let segmentLength = 20;
  let start = -16;
  let end = 16;

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

  document.querySelector(".btn-draw-figure").addEventListener("click", ()=>{
    drawFigures(context, segmentLength, centerX, centerY);
  });
}

// let canvas = document.querySelector("canvas");
//   let context = canvas.getContext("2d");

// document.querySelector(".btn-draw-figure").addEventListener("click", drawFigures(context, 25, 350, 350));

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

function drawFigures(ctx, segmentLength, centerX, centerY){
  let custom_X_upperRight = Number(document.querySelector(".number-input-x0").value); 
  let custom_Y_upperRight = Number(document.querySelector(".number-input-y0").value);
  let custom_X_lowerRight = Number(document.querySelector(".number-input-x1").value);
  let custom_Y_lowerRight = Number(document.querySelector(".number-input-y1").value);
  console.log("Custom coordinates RIGHT: UP", custom_X_upperRight, custom_Y_upperRight, "LOW", custom_X_lowerRight, custom_Y_lowerRight);
//
  // let canvasX0 = centerX + custom_X_upperRight * segmentLength;
  // let canvasY0 = centerY - custom_Y_upperRight * segmentLength;
  // let canvasX1 = centerX + custom_X_lowerRight * segmentLength;
  // let canvasY1 = centerY - custom_Y_lowerRight * segmentLength;
  // console.log(canvasX0, canvasY0, canvasX1, canvasY1);

  // let sideLength = Math.sqrt(Math.pow(canvasX1 - canvasX0, 2) + Math.pow(canvasY1 - canvasY0, 2));
  let sideLength = Math.sqrt(Math.pow((custom_X_lowerRight-custom_X_upperRight),2) + Math.pow((custom_Y_lowerRight-custom_Y_upperRight),2));
  console.log("Length of side:", sideLength);
  // let sideLength2 = (custom_Y_lowerRight - custom_Y_upperRight)*segmentLength;
  // console.log("Length of side2:", sideLength2);

  let custom_X_upperLeft = custom_X_upperRight - sideLength;
  let custom_Y_upperLeft = custom_Y_upperRight;
  let custom_X_lowerLeft = custom_X_lowerRight - sideLength;
  let custom_Y_lowerLeft = custom_Y_lowerRight;
  console.log("Custom coordinates LEFT: UP", custom_X_upperLeft, custom_Y_upperLeft, "LOW", custom_X_lowerLeft, custom_Y_lowerLeft);

  let squareCenterX = (canvasX0 + canvasX0_left) / 2;
  let squareCenterY = (canvasY0 + canvasY1) / 2;
  let angle = Math.atan2(canvasY1-canvasY0, canvasX1-canvasX0);
  console.log("x centr:", squareCenterX);
  console.log("y centr:", squareCenterY);

  ctx.save();
  ctx.translate(canvasX0, canvasY0);
  ctx.rotate(angle);
  // ctx.strokeStyle="#000";
  // ctx.strokeRect(0 ,0, sideLength, sideLength);
  //colorFigures(ctx, sideLength);

  // document.querySelector(".btn-color-figure").addEventListener("click", ()=>{
  //   colorFigures();
  // });
  let isBorderChecked = document.querySelector('.checkbox-border').checked;
  let isFillingChecked = document.querySelector('.checkbox-filling').checked;

  if(isBorderChecked && isSquareSelected()){
    ctx.strokeStyle=getColor();
    ctx.strokeRect(0, 0, sideLength, sideLength);
    console.log("1 work");
  }
  if(isFillingChecked && isSquareSelected()){
    ctx.fillStyle=getColor();
    ctx.fillRect(0, 0, sideLength, sideLength);
    console.log("2 work");
  }
  else if(!isBorderChecked && !isFillingChecked){
    ctx.strokeStyle="#000";
    ctx.strokeRect(0 ,0, sideLength, sideLength);
    console.log("3 work");
  }

  ctx.restore();
  console.log("X SIDE centr:", -sideLength / 2);
  console.log("Y SIDE centr:", -sideLength / 2);
  
  // Функція для обертання точки (x, y) на кут alpha відносно точки (x0, y0)

  const dx = squareCenterX - canvasX0;
  const dy = squareCenterY - canvasY0;
  const cosAlpha = Math.cos(angle);
  const sinAlpha = Math.sin(angle);
  const newX = canvasX0 + dx * cosAlpha - dy * sinAlpha;
  const newY = canvasY0 + dx * sinAlpha + dy * cosAlpha;

let newCenterX = (canvasX0 + newX)/2;
let newCenterY = (canvasY0 + newY)/2;
console.log(canvasX1, canvasY1, newX, newY);
console.log(newCenterX, newCenterY);
console.log(angle * (180 / Math.PI), cosAlpha, sinAlpha);
  //коло тут центр не правильний тре змінити зміни!
  let circleRadius = Math.sqrt(sideLength * sideLength + sideLength * sideLength)/2;
  ctx.beginPath();
  ctx.arc(newCenterX, newCenterY, circleRadius, 0, 2 * Math.PI);

  // ctx.strokeStyle = "#000";
  // ctx.stroke();
  // colorFigures(ctx, sideLength);
  //colorFigures();
  if(isFillingChecked && !isSquareSelected()){
    ctx.fillStyle=getColor();
    ctx.fill();
    console.log("1 work");
  }
  if(isBorderChecked && !isSquareSelected()){
    ctx.strokeStyle=getColor();
    ctx.stroke();
    console.log("2 work");
  }
  else if(!isBorderChecked && !isFillingChecked){
    ctx.strokeStyle = "#000";
    ctx.stroke();
  }
  // else{
  // //ctx.fillStyle = "rgba(0, 0, 0, 0)";
  // ctx.fillStyle = "rgba(255, 255, 255, 1)"; //??
  // ctx.fill();
  // }

}

function getColor(){
  let selectedValue = document.querySelector('.color-selector').value;
  if(selectedValue == "red"){
    //return "rgba(255, 0, 0, 0.3)";
    return "rgb(255, 0, 0)";
  }
  else if(selectedValue == "yellow"){
    return "rgba(255, 255, 0, 0.3)";
  }
  else if(selectedValue == "blue"){
    return "rgba(0, 0, 255, 0.3)";
  }
}

function isSquareSelected(){
  let selectedValue = document.querySelector('.figure-selector').value;
  let isSquare = true;
  if(selectedValue == "square"){
    return isSquare;
  }
  else if(selectedValue == "circle"){
    return !isSquare;
  }
}

function colorFigures(ctx, sideLength){
  let isBorderChecked = document.querySelector('.checkbox-border').checked;
  let isFillingChecked = document.querySelector('.checkbox-filling').checked;

  if (isSquareSelected()) {
    if (isBorderChecked) {
      ctx.strokeStyle = getColor();
      ctx.strokeRect(0, 0, sideLength, sideLength);
      console.log("Border work");
    }

    if (isFillingChecked) {
      ctx.fillStyle = getColor();
      ctx.fillRect(0, 0, sideLength, sideLength);
      console.log("Filling work");
    }
  } else {
    if (isBorderChecked) {
      ctx.strokeStyle = getColor();
      ctx.stroke();
      console.log("Border work");
    }

    if (isFillingChecked) {
      ctx.fillStyle = getColor();
      ctx.fill();
      console.log("Filling work");
    }
  }

  // if(isBorderChecked && isSquareSelected()){
  //   ctx.strokeStyle=getColor();
  //   ctx.strokeRect(0, 0, sideLength, sideLength);
  //   console.log("1 work");
  // }
  // if(isFillingChecked && isSquareSelected()){
  //   ctx.fillStyle=getColor();
  //   ctx.fillRect(0, 0, sideLength, sideLength);
  //   console.log("2 work");
  // }
  // else if(!isBorderChecked && !isFillingChecked){
  //   ctx.strokeStyle="#000";
  //   ctx.strokeRect(0 ,0, sideLength, sideLength);
  //   console.log("3 work");
  // }

  // if(isFillingChecked && !isSquareSelected()){
  //   ctx.fillStyle=getColor();
  //   ctx.fill();
  //   console.log("1 work");
  // }
  // if(isBorderChecked && !isSquareSelected()){
  //   ctx.strokeStyle=getColor();
  //   ctx.stroke();
  //   console.log("2 work");
  // }
}




///////!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// document.querySelector(".div-system-of-coordinates").innerHTML += <canvas width="700" height="700"></canvas>

drawSystemOfCoordinates();

function drawSystemOfCoordinates(){
  let canvas = document.querySelector("canvas");
  let context = canvas.getContext("2d");
  
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
    
  let segmentLength = 20;
  let start = -16;
  let end = 16;

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

  document.querySelector(".btn-draw-figure").addEventListener("click", ()=>{
    drawFigures(context, segmentLength, centerX, centerY);
  });
}

// let canvas = document.querySelector("canvas");
//   let context = canvas.getContext("2d");

// document.querySelector(".btn-draw-figure").addEventListener("click", drawFigures(context, 25, 350, 350));

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

function drawFigures(ctx, segmentLength, centerX, centerY){
  let customX0 = Number(document.querySelector(".number-input-x0").value);
  let customY0 = Number(document.querySelector(".number-input-y0").value);
  let customX1 = Number(document.querySelector(".number-input-x1").value);
  let customY1 = Number(document.querySelector(".number-input-y1").value);
  // console.log(customX0, customY0, customX1, customY1);
  console.log(customX0, customY0, customX1, customY1);
//
  let canvasX0 = centerX + customX0 * segmentLength;
  let canvasY0 = centerY - customY0 * segmentLength;
  let canvasX1 = centerX + customX1 * segmentLength;
  let canvasY1 = centerY - customY1 * segmentLength;
  console.log(canvasX0, canvasY0, canvasX1, canvasY1);

  // let sideLength = Math.sqrt(Math.pow(canvasX1 - canvasX0, 2) + Math.pow(canvasY1 - canvasY0, 2));
  let sideLength = Math.sqrt(Math.pow((canvasX1-canvasX0),2) + Math.pow((canvasY1 - canvasY0),2));
  console.log("Length of side:", sideLength);
  let sideLength2 = (customY1 - customY0)*segmentLength;
  console.log("Length of side2:", sideLength2);

  let canvasX0_left = canvasX0 - sideLength;
  let canvasY0_left = canvasY0 - sideLength;
  let canvasX1_left = canvasX1 - sideLength;
  let canvasY1_left = canvasY1 - sideLength;

  let squareCenterX = (canvasX0 + canvasX0_left) / 2;
  let squareCenterY = (canvasY0 + canvasY1) / 2;
  let angle = Math.atan2(canvasY1-canvasY0, canvasX1-canvasX0);
  console.log("x centr:", squareCenterX);
  console.log("y centr:", squareCenterY);

  ctx.save();
  ctx.translate(canvasX0, canvasY0);
  ctx.rotate(angle);
  // ctx.strokeStyle="#000";
  // ctx.strokeRect(0 ,0, sideLength, sideLength);
  //colorFigures(ctx, sideLength);
  // document.querySelector(".btn-color-figure").addEventListener("click", ()=>{
  //   colorFigures();
  // });
  let isBorderChecked = document.querySelector('.checkbox-border').checked;
  let isFillingChecked = document.querySelector('.checkbox-filling').checked;

  if(isBorderChecked && isSquareSelected()){
    ctx.strokeStyle=getColor();
    ctx.strokeRect(0, 0, sideLength, sideLength);
    console.log("1 work");
  }
  if(isFillingChecked && isSquareSelected()){
    ctx.fillStyle=getColor();
    ctx.fillRect(0, 0, sideLength, sideLength);
    console.log("2 work");
  }
  else if(!isBorderChecked && !isFillingChecked){
    ctx.strokeStyle="#000";
    ctx.strokeRect(0 ,0, sideLength, sideLength);
    console.log("3 work");
  }

  ctx.restore();
  console.log("X SIDE centr:", -sideLength / 2);
  console.log("Y SIDE centr:", -sideLength / 2);
  
  // Функція для обертання точки (x, y) на кут alpha відносно точки (x0, y0)

  const dx = squareCenterX - canvasX0;
  const dy = squareCenterY - canvasY0;
  const cosAlpha = Math.cos(angle);
  const sinAlpha = Math.sin(angle);
  const newX = canvasX0 + dx * cosAlpha - dy * sinAlpha;
  const newY = canvasY0 + dx * sinAlpha + dy * cosAlpha;

let newCenterX = (canvasX0 + newX)/2;
let newCenterY = (canvasY0 + newY)/2;
console.log(canvasX1, canvasY1, newX, newY);
console.log(newCenterX, newCenterY);
console.log(angle * (180 / Math.PI), cosAlpha, sinAlpha);
  //коло тут центр не правильний тре змінити зміни!
  let circleRadius = Math.sqrt(sideLength * sideLength + sideLength * sideLength)/2;
  ctx.beginPath();
  ctx.arc(newCenterX, newCenterY, circleRadius, 0, 2 * Math.PI);

  // ctx.strokeStyle = "#000";
  // ctx.stroke();
  // colorFigures(ctx, sideLength);
  //colorFigures();
  if(isFillingChecked && !isSquareSelected()){
    ctx.fillStyle=getColor();
    ctx.fill();
    console.log("1 work");
  }
  if(isBorderChecked && !isSquareSelected()){
    ctx.strokeStyle=getColor();
    ctx.stroke();
    console.log("2 work");
  }
  else if(!isBorderChecked && !isFillingChecked){
    ctx.strokeStyle = "#000";
    ctx.stroke();
  }
  // else{
  // //ctx.fillStyle = "rgba(0, 0, 0, 0)";
  // ctx.fillStyle = "rgba(255, 255, 255, 1)"; //??
  // ctx.fill();
  // }

}

function getColor(){
  let selectedValue = document.querySelector('.color-selector').value;
  if(selectedValue == "red"){
    //return "rgba(255, 0, 0, 0.3)";
    return "rgb(255, 0, 0)";
  }
  else if(selectedValue == "yellow"){
    return "rgba(255, 255, 0, 0.3)";
  }
  else if(selectedValue == "blue"){
    return "rgba(0, 0, 255, 0.3)";
  }
}

function isSquareSelected(){
  let selectedValue = document.querySelector('.figure-selector').value;
  let isSquare = true;
  if(selectedValue == "square"){
    return isSquare;
  }
  else if(selectedValue == "circle"){
    return !isSquare;
  }
}

function colorFigures(ctx, sideLength){
  let isBorderChecked = document.querySelector('.checkbox-border').checked;
  let isFillingChecked = document.querySelector('.checkbox-filling').checked;

  if (isSquareSelected()) {
    if (isBorderChecked) {
      ctx.strokeStyle = getColor();
      ctx.strokeRect(0, 0, sideLength, sideLength);
      console.log("Border work");
    }

    if (isFillingChecked) {
      ctx.fillStyle = getColor();
      ctx.fillRect(0, 0, sideLength, sideLength);
      console.log("Filling work");
    }
  } else {
    if (isBorderChecked) {
      ctx.strokeStyle = getColor();
      ctx.stroke();
      console.log("Border work");
    }

    if (isFillingChecked) {
      ctx.fillStyle = getColor();
      ctx.fill();
      console.log("Filling work");
    }
  }
  // if(isBorderChecked && isSquareSelected()){
  //   ctx.strokeStyle=getColor();
  //   ctx.strokeRect(0, 0, sideLength, sideLength);
  //   console.log("1 work");
  // }
  // if(isFillingChecked && isSquareSelected()){
  //   ctx.fillStyle=getColor();
  //   ctx.fillRect(0, 0, sideLength, sideLength);
  //   console.log("2 work");
  // }
  // else if(!isBorderChecked && !isFillingChecked){
  //   ctx.strokeStyle="#000";
  //   ctx.strokeRect(0 ,0, sideLength, sideLength);
  //   console.log("3 work");
  // }

  // if(isFillingChecked && !isSquareSelected()){
  //   ctx.fillStyle=getColor();
  //   ctx.fill();
  //   console.log("1 work");
  // }
  // if(isBorderChecked && !isSquareSelected()){
  //   ctx.strokeStyle=getColor();
  //   ctx.stroke();
  //   console.log("2 work");
  // }
}








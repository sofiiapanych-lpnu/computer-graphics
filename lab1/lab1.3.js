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
    drawFigures(context, segmentLength, centerX, centerY, start, end);
  });
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

function drawFigures(ctx, segmentLength, centerX, centerY, start, end){
  let colorInput = document.querySelector('.color-selector').value;
console.log(colorInput)
  let custom_X_upperRight = parseInt(document.querySelector(".number-input-x0").value); 
  let custom_Y_upperRight = parseInt(document.querySelector(".number-input-y0").value);
  let custom_X_lowerRight = parseInt(document.querySelector(".number-input-x1").value);
  let custom_Y_lowerRight = parseInt(document.querySelector(".number-input-y1").value);

  const values = [custom_X_upperRight, custom_Y_upperRight, custom_X_lowerRight, custom_Y_lowerRight];

  if (values.some(isNaN)) {
    alert("You should fill in all fields!");
  }
  else if (values.some(val => val > end || val < start)) {
    alert(`The value(-s) is out of range!\n\nShould be in a range from ${start} to ${end}`);
  }
  else if(custom_Y_upperRight === custom_Y_lowerRight){
    alert("Y coordinates shouldn't be equal!");
  }
  else{
    let sideLength = Math.sqrt(Math.pow((custom_X_lowerRight-custom_X_upperRight),2) + Math.pow((custom_Y_lowerRight-custom_Y_upperRight),2));

    let custom_X_upperLeft = custom_X_upperRight - sideLength;
    let custom_Y_upperLeft = custom_Y_upperRight;

    let angle = Math.atan2(custom_Y_upperRight - custom_Y_lowerRight,  custom_X_lowerRight - custom_X_upperRight);
  
    let canvasX0 = centerX + custom_X_upperRight * segmentLength;
    let canvasY0 = centerY - custom_Y_upperRight * segmentLength;
    sideLength *= segmentLength;
  
    let isBorderChecked = document.querySelector('.checkbox-border').checked;
    let isFillingChecked = document.querySelector('.checkbox-filling').checked;
  
    ctx.save();
    ctx.translate(canvasX0, canvasY0);
    ctx.rotate(angle);
    drawSquare(ctx, sideLength, isBorderChecked, isFillingChecked, colorInput);
    ctx.restore();
  
    function rotatePoint(x, y, x0, y0, alpha) {
      const dx = x - x0;
      const dy = y - y0;
      const cosAlpha = Math.cos(alpha);
      const sinAlpha = Math.sin(alpha);
      const newY = y0 + dx * cosAlpha - dy * sinAlpha;
      const newX = x0 + dx * sinAlpha + dy * cosAlpha;
      return { x: newX, y: newY };
    }
    
    let rotatedPoint_upperLeft = rotatePoint(custom_X_upperLeft, custom_Y_upperLeft, custom_X_upperRight, custom_Y_upperRight, angle);
    
    let newCenterX = (custom_X_lowerRight + rotatedPoint_upperLeft.x)/2;
    let newCenterY = (custom_Y_lowerRight + rotatedPoint_upperLeft.y)/2;
    let circleRadius = Math.sqrt(sideLength * sideLength + sideLength * sideLength)/2;
    ctx.beginPath();
    ctx.arc(centerX + newCenterX * segmentLength, centerY - newCenterY * segmentLength, circleRadius, 0, 2 * Math.PI);
    drawCircle(ctx, isBorderChecked, isFillingChecked, colorInput, sideLength);
    drawSquare(ctx, sideLength, isBorderChecked, isFillingChecked, colorInput)
  }
}

function getColor(){
  let selectedValue = document.querySelector('.color-selector').value;
  if(selectedValue == "red"){
    return "rgba(255, 0, 0, 0.3)";
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

function drawSquare(ctx, sideLength, isBorderChecked, isFillingChecked, colorInput){
  if (isSquareSelected()){
    if (isFillingChecked){
      ctx.fillStyle = colorInput;
      ctx.fillRect(0, 0, sideLength, sideLength);
      console.log("Filling SQUARE work");
    }
    if (isBorderChecked){
      ctx.strokeStyle = colorInput;
      ctx.strokeRect(0, 0, sideLength, sideLength);
      console.log("Border SQUARE work");
    }
    else{
      ctx.strokeStyle = "#000";
      ctx.strokeRect(0, 0, sideLength, sideLength);
      console.log("DEFAULT Border SQUARE work");
    }
  }
  else{
    ctx.strokeStyle = "#000";
    ctx.strokeRect(0, 0, sideLength, sideLength);
    console.log("DEFAULT Border SQUARE work");
  }
}

function drawCircle(ctx, isBorderChecked, isFillingChecked, colorInput, sideLength){
  if (!isSquareSelected()){
    if (isFillingChecked){
      ctx.fillStyle = colorInput;
      ctx.fill();     
      console.log("Filling CIRCLE work");
    }
    if (isBorderChecked){
      ctx.strokeStyle = colorInput;
      ctx.stroke();
      console.log("Border CIRCLE work");
    }
    else{
      // ctx.strokeStyle = "#000";
      // ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#000";
      ctx.strokeRect(0, 0, sideLength, sideLength);
      ctx.closePath();
      console.log("DEFAULT Border CIRCLE work");
    }
  }
  else{
    ctx.strokeStyle = "#000";
    ctx.stroke();
    console.log("DEFAULT Border CIRCLE work");
  }
}
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const fileInput = document.getElementById('fileInput');
let width, height; 

function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      width = img.width;
      height = img.height;
      canvas.width = width;
      canvas.height = height;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, width, height);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

fileInput.addEventListener('change', handleFileSelect);

function RGBToCMYKToRGB(){
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    const cmyk = RGBToCMYK(red, green, blue);

    const rgb = CMYKToRGB(cmyk.cyan, cmyk.magenta, cmyk.yellow, cmyk.black);

    data[i] = rgb.r;
    data[i + 1] = rgb.g;
    data[i + 2] = rgb.b;
  }
  ctx.putImageData(imageData, 0, 0);
}

function RGBToCMYK_output(){
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    const cmyk = RGBToCMYK(red, green, blue);

    data[i] = cmyk.cyan;
    data[i + 1] = cmyk.magenta;
    data[i + 2] = cmyk.yellow;
    //data[i + 3] = cmyk.black;
  }
  ctx.putImageData(imageData, 0, 0);
}

function RGBToCMYK(red, green, blue){
  let cyan = (255-red)/255;
  let magenta = (255-green)/255;
  let yellow = (255-blue)/255;
  let black = Math.min(cyan, magenta, yellow);

  cyan = 100*(cyan - black) / (1 - black);
  magenta = 100*(magenta - black) / (1 - black);
  yellow = 100*(yellow - black) / (1 - black);
  black = Math.round(black * 100);
  return {cyan, magenta, yellow, black};
}

function CMYKToRGB(cyan, magenta, yellow, black){
  const r = (1 - cyan/100) * (1 - black/100) * 255;
  const g = (1 - magenta/100) * (1 - black/100) * 255;
  const b = (1 - yellow/100) * (1 - black/100) * 255;
  return {r,g,b}
}

function RGBToHSBToRGB(){
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i]/255;
    const green = data[i + 1]/255;
    const blue = data[i + 2]/255;

    const hsb = RGBToHSB(red, green, blue);

    const rgb = HSBToRGB(hsb.h, hsb.s, hsb.b);

    data[i] = rgb.red;
    data[i + 1] = rgb.green;
    data[i + 2] = rgb.blue;
  }
  console.log('done')
  ctx.putImageData(imageData, 0, 0);
}

function RGBToHSB_output(){
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i]/255;
    const green = data[i + 1]/255;
    const blue = data[i + 2]/255;

    const hsb = RGBToHSB(red, green, blue);

    data[i] = hsb.h;
    data[i + 1] = hsb.s;
    data[i + 2] = hsb.b;
  }
  console.log('done')
  ctx.putImageData(imageData, 0, 0);
}
// function HSBToHSL(hue, saturation, brightness) {
//   // Convert the values to the range of [0, 1]
//   const h = hue / 360;
//   const s = saturation / 100;
//   const b = brightness / 100;

//   const l = (2 - s) * b / 2;

//   // Calculate saturation based on lightness
//   const sl = l === 0 || l === 1 ? 0 : (s * b) / (l < 0.5 ? l * 2 : 2 - l * 2);

//   return {
//     hue: Math.round(h * 360),
//     saturation: Math.round(sl * 100),
//     lightness: Math.round(l * 100)
//   };
// }

function RGBToHSB(red, green, blue){
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max-min;
  let h;

  if(delta===0){
    h=0;
  }
  else{
    if(max===red){
      h = 60*(green-blue)/delta + (green<blue ? 360 : 0);
    }
    else if(max===green){
      h = 60*(blue-red)/delta + 120;
    }
    else if(max===blue){
      h = 60*(red-green)/delta + 240;
    }
  }
  
  const s = max===0 ? 0 : 1-min/max;
  const b = max;
  return {h,s,b};
}

function HSBToRGB(h,s,b){
  const hi = Math.floor(h / 60) % 6;
  const f = h/60 - hi;
  const p = b*(1-s);
  const q = b*(1-f*s);
  const t = b*(1-(1-f)*s);

  let red, green, blue;

  switch (hi) {
    case 0:
      [red, green, blue] = [b, t, p];
      break;
    case 1:
      [red, green, blue] = [q, b, p];
      break;
    case 2:
      [red, green, blue] = [p, b, t];
      break;
    case 3:
      [red, green, blue] = [p, q, b];
      break;
    case 4:
      [red, green, blue] = [t, p, b];
      break;
    case 5:
      [red, green, blue] = [b, p, q];
      break;
  }

  red *= 255;
  green *= 255;
  blue *= 255;
  red = Math.round(red);
  green = Math.round(green); 
  blue = Math.round(blue);
  return { red, green, blue };
}

let isDrawing = false;
let startX, startY, endX, endY;

canvas.addEventListener('mousedown', handleMouseDown);
//canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(event) {
  isDrawing = true;
  startX = event.offsetX;
  startY = event.offsetY;
}

// function handleMouseMove(event) {
//   if (!isDrawing) return;
//   // endX = event.offsetX;
//   // endY = event.offsetY;
//   //draw();
// }

// Function to handle mouse up event
function handleMouseUp(event) {
  isDrawing = false;
  endX = event.offsetX;
  endY = event.offsetY;
  //draw();

  appendSlider();
}

// Function to draw the selected rectangle and change its color to blue
// function draw() {
//   // Clear the canvas
//   //ctx.clearRect(0, 0, canvas.width, canvas.height);
  
//   // Draw the image
//   // Replace 'img' with your image object
//   // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
//   // Calculate the dimensions of the selected rectangle
//   const width = Math.abs(endX - startX);
//   const height = Math.abs(endY - startY);
//   const x = Math.min(startX, endX);
//   const y = Math.min(startY, endY);
  
//   // Draw the selected rectangle
//   ctx.fillStyle = 'blue';
//   ctx.fillRect(x, y, width, height);
// }

function appendSlider(){
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0.1';
  slider.max = '0.9';
  slider.step = '0.01';
  slider.value = '0.5';
  slider.id = 'brightnessSlider';

  const infoDiv = document.querySelector('.div-information');
  infoDiv.appendChild(slider);

  slider.addEventListener('input', handleBrightnessChange);
}

function handleBrightnessChange(event) {
  const sliderValue = parseFloat(event.target.value); 
  
  const rectX = Math.min(startX, endX);
  const rectY = Math.min(startY, endY);
  const rectWidth = Math.abs(startX - endX);
  const rectHeight = Math.abs(startY - endY);

  const imageData = ctx.getImageData(rectX, rectY, rectWidth, rectHeight);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i]/255;
    const green = data[i + 1]/255;
    const blue = data[i + 2]/255;

    const hsb = RGBToHSB(red, green, blue);
    let brightness = hsb.b;
    if (isBlue(hsb.h, hsb.s, brightness)) {
      brightness = sliderValue;
    }
    const rgb = HSBToRGB(hsb.h, hsb.s, brightness);

    data[i] = rgb.red;
    data[i + 1] = rgb.green;
    data[i + 2] = rgb.blue;
  }
  console.log('done')
  ctx.putImageData(imageData, rectX, rectY);
}

function isBlue(hue, saturation, brightness) {
  return (hue >= 210 && hue <= 270) && saturation > 0.6 && brightness > 0;
}

function downloadCanvasAsImage() {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'image.png';
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.querySelector('.download-btn').addEventListener('click', downloadCanvasAsImage);
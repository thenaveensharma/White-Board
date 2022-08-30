let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor=document.querySelectorAll('.pencil-color');
let pencilWidthElem=document.querySelector('.pencil-width');
let eraserWidthElem=document.querySelector('.eraser-width');

let penColor="black";
let eraserColor="white";
let  penWidth=pencilWidthElem.value;
let  eraserWidth=eraserWidthElem.value;
console.log(eraserColor,eraserWidth)

let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

// mousedown-> start new path, mousemove-> path fill
let mouseDown = false;

canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    beginPath({
        x:e.clientX,
        y: e.clientY
    })
});

canvas.addEventListener("mousemove", (e) => {
    if (mouseDown)drawPath({
        x:e.clientX,
        y: e.clientY
    })
});

canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;
});

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawPath(strokeObj) {
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
}
pencilColor.forEach(colorElem => {
    colorElem.addEventListener('click',(e)=>{
        let color=colorElem.classList[0];
        penColor=color
        tool.strokeStyle=penColor;
    })
});

pencilWidthElem.addEventListener('change',(e)=>{
    penWidth=pencilWidthElem.value;
    tool.lineWidth=penWidth;
})
eraserWidthElem.addEventListener('change',(e)=>{
    eraserWidth=eraserWidthElem.value;
    tool.lineWidth=eraserWidth;
    tool.strokeStyle=eraserColor;
})
eraser.addEventListener('click',(e)=>{
    console.log('u just clicked eraser tool')
    if(eraserFlag){
    console.log(pencilColor,penWidth)

        tool.strokeStyle=pencilColor
        tool.lineWidth=penWidth;
    }
    else{
    console.log(eraserColor,eraserWidth)

        tool.strokeStyle=pencilColor;
        tool.lineWidth=eraserWidth;

    }
})
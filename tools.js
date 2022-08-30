let optionCont = document.querySelector(".option-cont");
let optionFlag = true;
let tools = document.querySelector(".tools-cont");
let pencil = document.querySelector(".pencil");
let pencilTool = document.querySelector(".pencil-tool-cont");
let pencilFlag = false;
let eraser = document.querySelector(".eraser");
let eraserTool = document.querySelector(".eraser-tool-cont");
let eraserFlag = false;
let noteBook = document.querySelector(".note-book");
let upload = document.querySelector(".upload");

optionCont.addEventListener("click", (e) => {
    if (optionFlag) closeTools();
    else openTools();
    optionFlag = !optionFlag;
});

function openTools() {
    let iconEl = optionCont.children[0];
    iconEl.classList.remove("fa-bars");
    iconEl.classList.add("fa-xmark");
    tools.style.display = "flex";
}

function closeTools() {
    let iconEl = optionCont.children[0];
    iconEl.classList.add("fa-bars");
    iconEl.classList.remove("fa-xmark");
    tools.style.display = "none";
    pencilTool.style.display = "none";
    eraserTool.style.display = "none";
}
pencil.addEventListener("click", (e) => {
    if (pencilFlag) {
        pencilTool.style.display = "none";
    } else {
        pencilTool.style.display = "block";
    }
    pencilFlag = !pencilFlag;
});
eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        eraserTool.style.display = "none";
    } else {
        eraserTool.style.display = "flex";
    }
    eraserFlag = !eraserFlag;
});

upload.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        let template = `<div class="action">
    <div class="minimize"></div>
    <div class="close"></div>
  </div>
  <div class='main-data'>
  <img src="${url}">
  </div>`;
        newSticky(template);
    });
});

noteBook.addEventListener("click", (e) => {
    let note = document.createElement("div");
    note.setAttribute("class", "note");
    let template = `
  <div class="action">
  <div class="minimize"></div>
  <div class="close"></div>
</div>
<div class='main-data'>
<textarea name="textarea"  cols="30" rows="10"></textarea>
</div>`;
    newSticky(template);
});

function dragDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = "absolute";
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + "px";
        element.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the element on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
        document.removeEventListener("mousemove", onMouseMove);
        element.onmouseup = null;
    };
}

function noteActions(minimize, remove, note) {
    remove.addEventListener("click", (e) => {
        note.remove();
    });
    minimize.addEventListener("click", (e) => {
        let noteCont = note.querySelector(".main-data");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    });
}

function newSticky(template) {
    let note = document.createElement("div");
    note.setAttribute("class", "note");
    note.innerHTML = template;
    document.body.appendChild(note);
    let minimize = note.querySelector(".minimize");
    let remove = note.querySelector(".close");

    noteActions(minimize, remove, note);

    note.onmousedown = function(event) {
        dragDrop(note, event);
    };

    note.ondragstart = function() {
        return false;
    };
}
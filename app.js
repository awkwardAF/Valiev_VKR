
class Room {
    constructor(id, name, groups) {
        this.id = id;
        this.name = name;
        this.groups = groups;
    }
}

class StaticObject {
    constructor(id, name, groups) {
        this.id = id;
        this.name = name;
        this.groups = groups;
    }
}

class InteractiveObject {
    constructor(id, name, groups) {
        this.id = id;
        this.name = name;
        this.groups = groups;
    }
}

class Npc {
    constructor(id, name, groups) {
        this.id = id;
        this.name = name;
        this.groups = groups;
    }
}

class Arrow {
    constructor(id, arrow, from, to, location) {
        this.id = id;
        this.arrow = arrow;
        this.from = from;
        this.to = to;
        this.location = location;
    }

    get getFrom() {
        return from;
    }

}

class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    setWidth(a) {
        this.width = a;
    }
    setHeigh(a) {
        this.height = a;
    }
    canvas() {
        return this;
    }
}

var selectedChildren = null;

var data;

var room = new Room();

var r1 = new Room("Bath", [])

var roomsArray = [];

var staticObjectsArray = [];

var interactiveObjectsArray = [];

var npcsArray = [];

var arrowsArray = [];

var context;


var selectedObject = 0;
var documentObject;

const roomWidth = 150;
const roomHeight = 75;
const staticObjectWidth = 75;
const staticObjectHeight = 75;
const interactiveObjectWidth = 75;
const interactiveObjectHeight = 75;
const npcWidth = 50;
const npcHeight = 75;
const fontSize = 11;
const borderWidth = 0.5;
var newData = null;
var newInputFile = document.getElementById("newSchema");
var parsedData;
var saveButton = document.getElementById("saveSchema");
var toJSON = "";
var objectID = 0;

saveButton.addEventListener("click", function () {
    toJSON += "{"
    // rooms
    if (roomsArray.length != 0) {
        toJSON += "\"rooms\":["
        roomsArray.forEach(room => {
            toJSON += "{"
            toJSON += "\"id\": " + room.groups.attrs.id + ",";
            toJSON += "\"x\": " + room.groups.attrs.x + ",";
            toJSON += "\"y\": " + room.groups.attrs.y + ",";
            toJSON += "\"name\": \"" + room.groups.getChildren()[1].attrs.text + "\""
            toJSON += "},"
        });
        toJSON += "]"
    }
    // static objects
    if (toJSON !== "{" && staticObjectsArray.length !== 0) { // add comma if there are more arrays with objects
        toJSON += ","
    }
    if (staticObjectsArray.length != 0) {
        toJSON += "\"statics\":["
        staticObjectsArray.forEach(static => {
            toJSON += "{"
            toJSON += "\"id\": " + static.groups.attrs.id + ",";
            toJSON += "\"x\": " + static.groups.attrs.x + ",";
            toJSON += "\"y\": " + static.groups.attrs.y + ",";
            toJSON += "\"name\": \"" + static.groups.getChildren()[1].attrs.text + "\""
            toJSON += "},"
        });
        toJSON += "]"
    }
    // interactive objects
    if (toJSON !== "{" && interactiveObjectsArray.length !== 0) { // add comma if there are more arrays with objects
        toJSON += ","
    }
    if (interactiveObjectsArray.length != 0) {
        toJSON += "\"interactives\":["
        interactiveObjectsArray.forEach(interactive => {
            toJSON += "{"
            toJSON += "\"id\": " + interactive.groups.attrs.id + ",";
            toJSON += "\"x\": " + interactive.groups.attrs.x + ",";
            toJSON += "\"y\": " + interactive.groups.attrs.y + ",";
            toJSON += "\"name\": \"" + interactive.groups.getChildren()[1].attrs.text + "\""
            toJSON += "},"
        });
        toJSON += "]"
    }
    // NPC
    if (toJSON !== "{" && npcsArray.length !== 0) { // add comma if there are more arrays with objects
        toJSON += ","
    }
    if (npcsArray.length != 0) {
        toJSON += "\"interactives\":["
        npcsArray.forEach(npc => {
            toJSON += "{"
            toJSON += "\"id\": " + npc.groups.attrs.id + ",";
            toJSON += "\"x\": " + npc.groups.attrs.x + ",";
            toJSON += "\"y\": " + npc.groups.attrs.y + ",";
            toJSON += "\"name\": \"" + npc.groups.getChildren()[1].attrs.text + "\""
            toJSON += "},"
        });
        toJSON += "]"
    }
    // arrows
    if (arrowsArray.length !== 0) {
        toJSON += ","
        if (arrowsArray.length != 0) {
            toJSON += "\"arrows\":["
            arrowsArray.forEach(arrow => {
                toJSON += "{"
                toJSON += "\"id\": " + arrow.id + ",";
                toJSON += "\"fromID\": " + arrow.from + ",";
                toJSON += "\"toID\": " + arrow.to + ",";
                toJSON += "\"location\": \"" + arrow.location + "\",";
                // toJSON += "\"name\":" + arrow.groups.getChildren()[1].attrs.text; + ","
                toJSON += "},"
            });
            toJSON += "]"
        }
    }
    // final bracket
    toJSON += "}";

    download(toJSON, "schema", "json");
    console.log(toJSON);
    console.log("--------------------");
    toJSON.JSON.parse.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
        });
        console.log('-------------------');
    });
});

document.getElementById('newSchema').addEventListener('change', readFileAsString)
function readFileAsString() {
    var files = this.files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (event) {
        parsedData = JSON.parse(event.target.result);
        console.log(parsedData);
    };
    reader.readAsText(files[0]);
    download(toJSON, "schema", "json");
}

function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}


// var roomWidth = 100;
// var roomHeight = 50;
// var staticObjectWidth = 50;
// var staticObjectHeight = 50;
// var interactiveObjectWidth = 50;
// var interactiveObjectHeight = 50;
// var fontSize = 11;
// var borderWidth = 1;


let drawnShapes = [];

function move(scale, translatePos) {
    context.translate(translatePos.x, translatePos.y);
    context.scale(scale, scale);
}

var stageWidth = 1500;
var stageHeight = 900;


// GRID LAYER


var shadowOffset = 20;
var tween = null;
var blockSnapSize = 25;


var stage = new Konva.Stage({
    container: 'container',
    width: stageWidth,
    height: stageHeight,
    scaleX: 1,
    scaleY: 1,
});

var stage = new Konva.Stage({
    container: 'container',
    width: stageWidth,
    height: stageHeight,
    scaleX: 1,
    scaleY: 1,
});

var shadowRectangle = new Konva.Rect({
    x: 0,
    y: 0,
    width: blockSnapSize * 6,
    height: blockSnapSize * 3,
    fill: '#FF7B17',
    opacity: 0.6,
    stroke: '#CF6412',
    strokeWidth: 3,
    dash: [20, 2]
});

var gridLayer = new Konva.Layer();
var padding = blockSnapSize;
for (var i = -stageWidth; i < (stageWidth / padding) * 2; i++) {
    gridLayer.add(new Konva.Line({
        points: [Math.round(i * padding) + 0.5, -1500, Math.round(i * padding) + 0.5, stageHeight * 2],
        stroke: '#b1b1b1',
        strokeWidth: 1,
    }));
}

gridLayer.add(new Konva.Line({ points: [-1500, -1500, 10, 10] }));
for (var j = -stageHeight; j < (stageHeight / padding) * 2; j++) {
    gridLayer.add(new Konva.Line({
        points: [-1500, Math.round(j * padding), stageWidth * 2, Math.round(j * padding)],
        stroke: '#b1b1b1',
        strokeWidth: 0.5,
    }));
}

var layer = new Konva.Layer();
shadowRectangle.hide();
layer.add(shadowRectangle);

stage.add(gridLayer);
stage.add(layer);

// --------------------------------

var settingsWindow = document.getElementById("settingsWindow");
var closeModalButton = document.getElementById("closeModalButton");
closeModalButton.onclick = function () {
    settingsWindow.style.display = "none";
    tr.nodes([]);
    selectedChildren = null;
}
window.onclick = function (event) {
    if (event.target == settingsWindow) {
        settingsWindow.style.display = "none";
        tr.nodes([]);
        selectedChildren = null;
    }
}


var layer = new Konva.Layer();

// function drawNewLines(){
//     // getRelativePosition(arrowsArray);
//     arrowsArray.forEach(arrow => {
//         arrow.setAttr('x', arrow.getFrom().getAttr('x'));
//         arrow.setAttr('y', arrow.getFrom().getAttr('y'));
//         // arrow.setAttr('points', [0, 0, arrow.from.getAttr('x') - arrow.from.getAttr('width'), arrow.to.getAttr('y') - arrow.to.getAttr('height')]);
//         arrow.setAttr('points', [0, 0, -10, 110]);
//     });
// }

function getRelativePosition(firstPoint, secondPoint) {
    var horizontal;
    if (Math.abs(firstPoint.getAttr('x') - secondPoint.getAttr('x')) <= Math.abs(firstPoint.getAttr('y') - secondPoint.getAttr('y'))) {
        horizontal = true;
    }
    if (horizontal && (firstPoint.getAttr('y') - secondPoint.getAttr('y') > 0)) {
        return 'top'
    }
    else if (horizontal && (firstPoint.getAttr('y') - secondPoint.getAttr('y') < 0)) {
        return 'bottom'
    }
    else if (!horizontal && (firstPoint.getAttr('x') - secondPoint.getAttr('x') > 0)) {
        return 'left'
    }
    else {
        return 'right'
    }

};

var shapesLayer = new Konva.Layer();
var tr = new Konva.Transformer();
// var testRect = new Konva.Rect({
//     x: 20,
//     y: 20,
//     width: 190,
//     height: 190,
//     fill: '#a1ffbd',
//     stroke: 'black',
//     strokeWidth: 1,
//     draggable: true,
//     name: 'schemaobject'
// });
// layer.add(testRect);
// stage.add(layer);
var scaleBy = 1.10;
stage.on('wheel', (e) => {
    // stop default scrolling
    e.evt.preventDefault();

    var oldScale = stage.scaleX();
    var pointer = stage.getPointerPosition();

    var mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? -1 : 1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
        direction = -direction;
    }

    var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
});

var selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
});

var nameField = document.getElementById('nameField');

var fromToAmount = 0;
var clickedObjects = [];

var arrowWindow = document.getElementById("arrowModal");
var selectedOption = document.getElementById("dropdownMenuButton");

function calculateVector(clickedObjects) {
    firstObject = clickedObjects[0].getParent();
    secondObject = clickedObjects[1].getParent();
    // getRelativePosition(firstObject, selectedObject);
    if (secondObject == firstObject) {
        alert("Вы не можете добавить зависимость к одному и тому же объекту");
        fromToAmount = 0;
        return;
    }
    var vector = getRelativePosition(firstObject, secondObject);
    var startXCalculated = 0;
    var endXCalculated = 0;
    var startYCalculated = 0;
    var endYCalculated = 0;
    if (vector == 'top') {
        startXCalculated = firstObject.getAttr('x') + firstObject.getAttr('width') / 2;
        startYCalculated = firstObject.getAttr('y');
        endXCalculated = secondObject.getAttr('x') - firstObject.getAttr('x') - firstObject.getAttr('width') / 2 + secondObject.getAttr('width') / 2;
        endYCalculated = secondObject.getAttr('y') - firstObject.getAttr('y') + secondObject.getAttr('height');
    }
    else if (vector == 'right') {
        startXCalculated = firstObject.getAttr('x') + firstObject.getAttr('width');
        startYCalculated = firstObject.getAttr('y') + firstObject.getAttr('height') / 2;
        endXCalculated = secondObject.getAttr('x') - firstObject.getAttr('x') - firstObject.getAttr('width');
        endYCalculated = secondObject.getAttr('y') - firstObject.getAttr('y');
    }
    else if (vector == 'left') {
        startXCalculated = firstObject.getAttr('x');
        startYCalculated = firstObject.getAttr('y') + firstObject.getAttr('height') / 2;
        endXCalculated = secondObject.getAttr('x') - firstObject.getAttr('x') + secondObject.getAttr('width');
        endYCalculated = secondObject.getAttr('y') - firstObject.getAttr('y');
    }
    if (vector == 'bottom') {
        startXCalculated = firstObject.getAttr('x') + firstObject.getAttr('width') / 2;
        startYCalculated = firstObject.getAttr('y') + firstObject.getAttr('height');
        endXCalculated = secondObject.getAttr('x') - firstObject.getAttr('x') + secondObject.getAttr("width") / 2 - firstObject.getAttr('width') / 2;
        endYCalculated = secondObject.getAttr('y') - firstObject.getAttr('y') - secondObject.getAttr('height');
    }
    arrowWindow.classList.remove("hidden");
    return [startXCalculated, endXCalculated, startYCalculated, endYCalculated];
}

function drawArrow(selectedLocation) {
    var coords = calculateVector(clickedObjects);
    startXCalculated = coords[0];
    endXCalculated = coords[1];
    startYCalculated = coords[2];
    endYCalculated = coords[3];
    var arrow = new Konva.Arrow({
        x: startXCalculated,
        y: startYCalculated,
        points: [0, 0, endXCalculated, endYCalculated],
        pointerLength: 11,
        pointerWidth: 11,
        fill: 'black',
        stroke: 'black',
        name: '',
        strokeWidth: 1,
        location: selectedLocation,
    });
    arrowClass = new Arrow(arrowNumber, arrow, firstObject.attrs.id, secondObject.attrs.id, selectedLocation);
    arrowNumber += 1;
    arrowsArray.push(arrowClass);
    console.log(arrowsArray);
    layer.add(arrow);
    stage.add(layer);
    layer.draw();
    fromToAmount = 0;
    clickedObjects = [];
}

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', event => {
        drawArrow(event.target.text);
        arrowWindow.classList.add("hidden");
    })
})

// clicks should select/deselect shapes
stage.on('click tap', function (e) {
    if (selectedObject == 5) {
        if (e.target == stage) {
            alert("Зависимость рисуется от одного объекта к другому");
            fromToAmount = 0;
            return;
        }
        clickedObjects[fromToAmount] = e.target;
        fromToAmount += 1;
        if (fromToAmount == 2) {
            calculateVector(clickedObjects);
        }

    }

    // if we are selecting with rect, do nothing
    if (selectionRectangle.visible()) {
        return;
    }

    // if click on empty area - remove all selections
    if (e.target === stage) {
        tr.nodes([]);
        return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName('schemaobject')) {
        tr.nodes([]);
        return;
    }

    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
        if (selectedObject == 5) {
            return;
        }
        var children = e.target.getParent().getChildren();
        var objectText = children[1].getAttr("text");
        var title = document.getElementById("windowtitle");
        title.innerHTML = "Объект \"" + objectText + "\"";
        settingsWindow.style.display = "block";
        var destroyButton = document.getElementById("destroyButton");
        var destroyIndex = 0;

        selectedChildren = children;

        destroyButton.addEventListener('click', function () {
            if (selectedChildren[1].getAttr('objectType') == 'room') {
                for (i = 0; i < roomsArray.length; i++) {
                    // console.log("room" + i);
                    if (roomsArray[i].groups == selectedChildren[1].getParent()) {
                        console.log("delete room" + i);
                        destroyIndex = i;
                        roomsArray.splice(i, 1);
                    }
                };
            }
            else if (selectedChildren[1].getAttr('objectType') == 'static') {
                for (i = 0; i < staticObjectsArray.length; i++) {
                    // console.log("static" + i);
                    if (staticObjectsArray[i].groups == selectedChildren[1].getParent()) {
                        console.log("delete static" + i);
                        destroyIndex = i;
                        staticObjectsArray.splice(i, 1);
                    }
                };
            }
            else if (selectedChildren[1].getAttr('objectType') == 'interactive') {
                for (i = 0; i < interactiveObjectsArray.length; i++) {
                    if (interactiveObjectsArray[i].groups == selectedChildren[1].getParent()) {
                        // console.log("delete interactive" + i);
                        destroyIndex = i;
                        interactiveObjectsArray.splice(i, 1);
                    }
                };
            }
            else if (selectedChildren[1].getAttr('objectType') == 'NPC') {
                for (i = 0; i < npcsArray.length; i++) {
                    if (npcsArray[i].groups == selectedChildren[1].getParent()) {
                        destroyIndex = i;
                        npcsArray.splice(i, 1);
                    }
                };
            }
            destroyArrows = [];
            arrowsArray.forEach(arrow => {
                if (arrow.from == selectedChildren[0].getParent().attrs.id || arrow.to == selectedChildren[0].getParent().attrs.id) {
                    destroyArrows.push(arrow.id);
                }
            });
            for (var i = 0; i < arrowsArray.length; i++) {
                for (var j = 0; j < destroyArrows.length; j++) {
                    if (arrowsArray[i].id == destroyArrows[j]) {
                        arrowsArray[i].arrow.destroy();
                    }
                }
            }
            for (var i = destroyArrows.length - 1; i >= 0; i--) {
                arrowsArray.splice(destroyArrows[i], 1);
            }
            // console.log(arrowsArray);
            destroyArrows = [];
            selectedChildren[1].getParent().destroy();
            // console.log("Rooms: " + roomsArray.length + " " + roomsArray);
            // console.log("Statics: " + staticObjectsArray.length + " " + staticObjectsArray);
            // console.log("Interactives: " + interactiveObjectsArray.length + " " + interactiveObjectsArray);
            // console.log("NPCs: " + npcsArray.length + " " + npcsArray);
            // console.log("Arrows: " + arrowsArray.length + " " + arrowsArray);
            // console.log("-----------------")
            settingsWindow.style.display = "none";
            e.target = [];
            children = [];
            objectText = [];
        });
        var saveNameButton = document.getElementById("changeButton");
        saveNameButton.addEventListener('click', function () {
            selectedChildren[1].setAttr('text', document.getElementById("nameField").value);
            shapesLayer.draw();
            settingsWindow.style.display = "none";
        });
    }
});

var mouseDown = false;
// var roomNumber = 0;
// var interactiveObjectNumber = 0;
// var staticObjectNumber = 0;
// var npcNumber = 0;
var arrowNumber = 0;

stage.addEventListener("click", function () {
    if (selectedObject == 5) {
        return;
    }
    if (selectedObject == 0) {
        tr.nodes([]);
    }
    // DRAW ROOM
    if (selectedObject == 1) {
        drawRoom();
    }
    // DRAW STATIC OBJECT
    if (selectedObject == 2) {
        drawStatic();
    }
    // DRAW INTERACTIVE OBJECT
    if (selectedObject == 3) {
        drawInteractive();
    }

    // DRAW NPC
    if (selectedObject == 4) {
        drawNPC();
    }

    if (selectedObject == 5) {
        var mousePos = stage.getRelativePointerPosition();
        if (e.target == stage) {
            alert("Зависимость рисуется от одного объекта к другому");
        }
    }
    shapesLayer.drawHit();
    stage.add(shapesLayer);
});
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}



document.getElementById("roomButton").addEventListener("click", function () {
    if (selectedObject == 1) {
        documentObject = document.getElementById("roomButton");
        selectedObject = 0;
        documentObject.style.color = "black";
        return;
    }
    if (selectedObject !== 0) {
        documentObject.style.color = "black";
    }
    if (selectedObject == 5) {
        documentObject.style.borderWidth = "0px";
    }
    documentObject = document.getElementById("roomButton");
    selectedObject = 1;
    documentObject.style.color = "red";
}, false);

document.getElementById("objectButton").addEventListener("click", function () {
    if (selectedObject == 2) {
        documentObject = document.getElementById("objectButton");
        selectedObject = 0;
        documentObject.style.color = "black";
        return;
    }
    if (selectedObject !== 0) {
        documentObject.style.color = "black";
    }
    if (selectedObject == 5) {
        documentObject.style.borderWidth = "0px";
    }
    documentObject = document.getElementById("objectButton");
    selectedObject = 2;
    documentObject.style.color = "red";
}, false);

document.getElementById("interactiveObjectButton").addEventListener("click", function () {
    if (selectedObject == 3) {
        documentObject = document.getElementById("interactiveObjectButton");
        selectedObject = 0;
        documentObject.style.color = "black";
        return;
    }
    if (selectedObject !== 0) {
        documentObject.style.color = "black";
    }
    if (selectedObject == 5) {
        documentObject.style.borderWidth = "0px";
    }
    documentObject = document.getElementById("interactiveObjectButton");
    selectedObject = 3;
    documentObject.style.color = "red";
}, false);

document.getElementById("npcButton").addEventListener("click", function () {
    if (selectedObject == 4) {
        documentObject = document.getElementById("npcButton");
        selectedObject = 0;
        documentObject.style.color = "black";
        return;
    }
    if (selectedObject !== 0) {
        documentObject.style.color = "black";
    }
    if (selectedObject == 5) {
        documentObject.style.borderWidth = "0px";
    }
    documentObject = document.getElementById("npcButton");
    selectedObject = 4;
    documentObject.style.color = "red";
}, false);

document.getElementById("arrowButton").addEventListener("click", function () {
    if (selectedObject == 5) {
        documentObject = document.getElementById("arrowButton");
        selectedObject = 0;
        documentObject.style.borderWidth = "0px";
        return;
    }
    if (selectedObject !== 0) {
        documentObject.style.color = "black";
    }
    if (selectedObject == 5) {
        documentObject.style.borderWidth = "0px";
    }
    documentObject = document.getElementById("arrowButton");
    selectedObject = 5;
    documentObject.style.border = "solid";
    documentObject.style.borderColor = "red";
    documentObject.style.borderWidth = "1px";
    fromToAmount = 0;
}, false);


// DRAWINGS

function drawRoom(x, y,) {
    var mousePos = stage.getRelativePointerPosition();
    var room = new Konva.Group({
        x: Math.round((mousePos.x - roomWidth / 2) / blockSnapSize) * blockSnapSize,
        y: Math.round((mousePos.y - roomHeight / 2) / blockSnapSize) * blockSnapSize,
        width: roomWidth,
        height: roomHeight,
        draggable: false,
        id: objectID,
    })
    var roomToAdd = new Konva.Rect({
        width: roomWidth,
        height: roomHeight,
        fill: '#ffa1a1',
        stroke: 'black',
        strokeWidth: borderWidth,
        name: 'schemaobject',
        shadowColor: 'black',
        shadowBlur: 2,
        shadowOffset: { x: 1, y: 1 },
        shadowOpacity: 0.4,
        draggable: false,
    });
    room.add(roomToAdd);
    var textToAdd = new Konva.Text({
        y: roomHeight / 2 - roomHeight / 6,
        text: 'room ' + objectID,
        fontSize: 18,
        fontFamily: 'Montserrat',
        fill: '#000',
        width: roomWidth,
        name: 'schemaobject',
        padding: 5,
        align: 'center',
        draggable: false,
        objectType: 'room'
    })
    room.add(textToAdd);
    var newRoom = new Room(objectID, 'room ' + objectID, room);
    objectID += 1;
    shapesLayer.add(room);
    roomsArray.push(newRoom);
    roomToAdd.on('mouseover', function () {
        roomToAdd.setAttr('fill', '#e69191');
    });
    roomToAdd.on('mouseout', function () {
        roomToAdd.setAttr('fill', '#ffa1a1')
    });
    textToAdd.on('mouseover', function () {
        roomToAdd.setAttr('fill', '#e69191');
    });
    textToAdd.on('mouseout', function () {
        roomToAdd.setAttr('fill', '#ffa1a1')
    });
}

function drawStatic() {
    var mousePos = stage.getRelativePointerPosition();
    var staticObject = new Konva.Group({
        x: Math.round((mousePos.x - staticObjectWidth / 2) / blockSnapSize) * blockSnapSize,
        y: Math.round((mousePos.y - staticObjectHeight / 2) / blockSnapSize) * blockSnapSize,
        width: staticObjectWidth,
        height: staticObjectHeight,
        draggable: false,
        id: objectID,
    })
    var objectToAdd = new Konva.Rect({
        width: staticObjectWidth,
        height: staticObjectHeight,
        fill: '#ffffa1',
        stroke: 'black',
        name: 'schemaobject',
        strokeWidth: borderWidth,
        shadowColor: 'black',
        shadowBlur: 2,
        shadowOffset: { x: 1, y: 1 },
        shadowOpacity: 0.4,
        draggable: false,
        onhover: 'fill , #ff000',
    })
    staticObject.add(objectToAdd);
    var textToAdd = new Konva.Text({
        height: staticObjectHeight,
        text: 'object ' + objectID,
        fontSize: fontSize,
        fontFamily: 'Montserrat',
        fill: '#000',
        width: staticObjectWidth,
        name: 'schemaobject',
        verticalAlign: 'middle',
        padding: 5,
        align: 'center',
        draggable: false,
        objectType: 'static'
    })
    staticObject.add(textToAdd);
    var newStaticObject = new StaticObject(objectID, 'object ' + objectID, staticObject);
    objectID += 1;
    objectToAdd.on('mouseover', function () {
        objectToAdd.setAttr('fill', '#e6e691');
    });
    objectToAdd.on('mouseout', function () {
        objectToAdd.setAttr('fill', '#ffffa1')
    });
    textToAdd.on('mouseover', function () {
        objectToAdd.setAttr('fill', '#e6e691');
    });
    textToAdd.on('mouseout', function () {
        objectToAdd.setAttr('fill', '#ffffa1')
    });
    shapesLayer.add(staticObject);
    staticObjectsArray.push(newStaticObject);
}

function drawInteractive() {
    var mousePos = stage.getRelativePointerPosition();
    var interactiveObject = new Konva.Group({
        x: (Math.round(mousePos.x / blockSnapSize) * blockSnapSize - blockSnapSize / 2) - 37.5,
        y: (Math.round(mousePos.y / blockSnapSize) * blockSnapSize - blockSnapSize / 2) - 37.5,
        width: interactiveObjectWidth,
        height: interactiveObjectHeight,
        draggable: false,
        id: objectID,
    })
    var objectToAdd = new Konva.Rect({
        width: interactiveObjectWidth,
        height: interactiveObjectHeight,
        fill: '#a1ffa1',
        stroke: 'black',
        name: 'schemaobject',
        strokeWidth: borderWidth,
        cornerRadius: 100,
        shadowColor: 'black',
        shadowBlur: 2,
        shadowOffset: { x: 1, y: 1 },
        shadowOpacity: 0.4,
        draggable: false,
        onhover: 'fill , #ff000',
    })
    interactiveObject.add(objectToAdd);
    var textToAdd = new Konva.Text({
        height: interactiveObjectHeight,
        text: 'interact ' + objectID,
        fontSize: fontSize,
        fontFamily: 'Montserrat',
        fill: '#000',
        width: interactiveObjectWidth,
        name: 'schemaobject',
        padding: 5,
        verticalAlign: 'middle',
        align: 'center',
        draggable: false,
        objectType: 'interactive'
    })
    interactiveObject.add(textToAdd);
    var newInteractiveObject = new InteractiveObject(objectID, 'interact ' + objectID, interactiveObject);
    objectID += 1;
    objectToAdd.on('mouseover', function () {
        objectToAdd.setAttr('fill', '#91e691');
    });
    objectToAdd.on('mouseout', function () {
        objectToAdd.setAttr('fill', '#a1ffa1')
    });
    textToAdd.on('mouseover', function () {
        objectToAdd.setAttr('fill', '#91e691');
    });
    textToAdd.on('mouseout', function () {
        objectToAdd.setAttr('fill', '#a1ffa1')
    });
    shapesLayer.add(interactiveObject);
    interactiveObjectsArray.push(newInteractiveObject);
}

function drawNPC() {
    var mousePos = stage.getRelativePointerPosition();
    var npc = new Konva.Group({
        x: Math.round((mousePos.x - npcWidth / 2) / blockSnapSize) * blockSnapSize,
        y: Math.round((mousePos.y - npcHeight / 2) / blockSnapSize) * blockSnapSize,
        width: npcWidth,
        height: npcHeight,
        draggable: false,
        id: objectID,
    })
    var npcToAdd = new Konva.Rect({
        width: npcWidth,
        height: npcHeight,
        fill: '#a1ffff',
        stroke: 'black',
        strokeWidth: borderWidth,
        name: 'schemaobject',
        shadowColor: 'black',
        shadowBlur: 2,
        shadowOffset: { x: 1, y: 1 },
        shadowOpacity: 0.4,
        draggable: false,
        cornerRadius: 15,
    });
    npc.add(npcToAdd);
    var textToAdd = new Konva.Text({
        height: npcHeight,
        text: 'NPC ' + objectID,
        fontSize: 16,
        fontFamily: 'Montserrat',
        fill: '#000',
        width: npcWidth,
        name: 'schemaobject',
        padding: 5,
        align: 'center',
        verticalAlign: 'middle',
        draggable: false,
        objectType: 'NPC'
    })
    npc.add(textToAdd);
    var newNPC = new Npc(objectID, 'NPC ' + objectID, npc);
    objectID += 1;
    shapesLayer.add(npc);
    npcsArray.push(newNPC);
    npcToAdd.on('mouseover', function () {
        npcToAdd.setAttr('fill', '#91e6e6');
    });
    npcToAdd.on('mouseout', function () {
        npcToAdd.setAttr('fill', '#a1ffff')
    });
    textToAdd.on('mouseover', function () {
        npcToAdd.setAttr('fill', '#91e6e6');
    });
    textToAdd.on('mouseout', function () {
        npcToAdd.setAttr('fill', '#a1ffff')
    });
}
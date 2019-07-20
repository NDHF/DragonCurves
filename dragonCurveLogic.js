console.log(
    "THE DRAGON CURVE DRAWING FUNCTION" + "\n" +
    "BY NICHOLAS BERNHARD" + "\n" +
    "COPYRIGHT 2019" + "\n" +
    "LIFE, AH, FINDS A WAY."
);

let directionArray = [2];

// up = 0 right = 1 down = 2 left = 3

let iterationValueTable = [
    {x: 600, y: 300, lineLength: 200, spoken: "FIRST"},
    {x: 700, y: 300, lineLength: 200, spoken: "SECOND"},
    {x: 700, y: 600, lineLength: 200, spoken: "THIRD"},
    {x: 600, y: 600, lineLength: 100, spoken: "FOURTH"},
    {x: 350, y: 650, lineLength: 100, spoken: "FIFTH"},
    {x: 250, y: 550, lineLength: 75, spoken: "SIXTH"},
    {x: 300, y: 350, lineLength: 50, spoken: "SEVENTH"},
    {x: 400, y: 250, lineLength: 40, spoken: "EIGHTH"},
    {x: 600, y: 250, lineLength: 25, spoken: "NINTH"},
    {x: 750, y: 350, lineLength: 19, spoken: "TENTH"},
    // {x: 480, y: 140, lineLength: 10, spoken: "TENTH"},
    // {x: 1050, y: 600, lineLength: 13, spoken: "ELEVENTH"},
    {x: 400, y: 200, lineLength: 10, spoken: "ELEVENTH"},
    {x: 600, y: 700, lineLength: 9, spoken: "TWELFTH"},
    {x: 350, y: 700, lineLength: 7, spoken: "THIRTEENTH"},
    {x: 235, y: 600, lineLength: 5, spoken: "FOURTHEENTH"},
    {x: 300, y: 375, lineLength: 3, spoken: "FIFTEENTH"},
    {x: 400, y: 275, lineLength: 2, spoken: "SIXTEENTH"},
    {x: 600, y: 275, lineLength: 1.5, spoken: "SEVENTEENTH"},
    {x: 700, y: 375, lineLength: 1, spoken: "EIGHTEENTH"}
];

let originalX = 0;
let originalY = 0;

let x = 0;
let y = 0;
let lineLength = 0;

let currentIteration = 1;
let maxIterations = 0;

function getById(id) {
    return document.getElementById(id);
};

function whenClicked(id, functionToRun) {
    getById(id).addEventListener("click", functionToRun);
}

let dragonCurveCanvas = getById("dragonCurveCanvas");
let ctx = dragonCurveCanvas.getContext("2d");
ctx.strokeStyle = "red";

function runDragonCurve() {

    let rotatedArray = [];

    function rotateAndUnshift(item) {
        if (item < 3) {
            rotatedArray.unshift(item + 1);
        } else if (item === 3) {
            rotatedArray.unshift(0);
        }
    }

    directionArray.forEach(rotateAndUnshift);

    directionArray = directionArray.concat(rotatedArray);

    function drawDragonCurve(item) {

        ctx.beginPath();
        ctx.moveTo(x, y);
        if (item === 0) {
            y = (y - lineLength);
        } else if (item === 1) {
            x = (x + lineLength);
        } else if (item === 2) {
            y = (y + lineLength);
        } else if (item === 3) {
            x = (x - lineLength);
        }
        ctx.lineTo(x, y);
        // ctx.rect(x, y, lineLength, lineLength);
        ctx.stroke();
    }

    directionArray.forEach(drawDragonCurve);
    x = originalX;
    y = originalY;

};

function dragonCurveWhileLoop() {
    currentIteration = 1;
    ctx.clearRect(0, 0, dragonCurveCanvas.width, dragonCurveCanvas.height);
    let iterationSelectElement = getById("iterationSelect");
    let selectedIteration = iterationSelectElement[iterationSelectElement.selectedIndex].value;
    let selectedIterationToInteger = parseInt(selectedIteration);
    if (isNaN(selectedIterationToInteger) === false) {
        maxIterations = selectedIterationToInteger + 1;
        x = iterationValueTable[selectedIterationToInteger- 1].x;
        y = iterationValueTable[selectedIterationToInteger - 1].y;
        originalX = iterationValueTable[selectedIterationToInteger - 1].x;
        originalY = iterationValueTable[selectedIterationToInteger - 1].y;
        lineLength = iterationValueTable[selectedIterationToInteger - 1].lineLength;
        while (currentIteration < maxIterations) {
            runDragonCurve();
            currentIteration = (currentIteration + 1);
        }
        getById("whichIteration").innerHTML = iterationValueTable[selectedIterationToInteger - 1].spoken;
        getById("iterationExponent").innerHTML = selectedIterationToInteger;
        getById("asInteger").innerHTML = Math.pow(2, selectedIterationToInteger);
        getById("informationDiv").style.visibility = "visible";
    } else {
        console.error("Did not select a number");
    }
    getById("printout").value = JSON.stringify(directionArray);
    // originalX = 0;
    // originalY = 0;

    // x = 0;
    // y = 0;
    // lineLength = 0;
    // currentIteration = 1;
    // maxIterations = 0;
    // directionArray = [2];
}

whenClicked("runDragonCurve", dragonCurveWhileLoop);
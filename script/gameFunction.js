// different function building the game (movement, etc.)

let score;
let c0;
let colorDict = ['antiquewhite','#7fffd4','#7bf5d6','#77ebd8','#74e0da','#70d6dd','#6cccdf','#68c2e1', '#64b8e3', '#61ade5', '#5da3e7', '#5999ea', '#558fec', '#5185ee'];

// Function

function afterMovement() { //does all necessary update after a movement
    analyseColor();
    updateScore();
    updateStorage();
    checkLost();
}

function getValue(i,j) { //get value of a table cell
    if (i < 4 && i >= 0 && j<4 && j>=0) {return document.getElementById('table').rows[i].cells[j].innerHTML}
    else {return false}
}

function setValue(i,j,val) { // set value of a table cell
    document.getElementById('table').rows[i].cells[j].innerHTML = val;
}

function showRow(i) { // get value of a table row
    let rowToReturn = [];
    for (let column of document.getElementById('table').rows[i].cells) {
        rowToReturn.push(column.innerHTML);
    }
    return rowToReturn;
}

function showCol(j) { // get value of a table column
    let columnToReturn = [];
    for (let row of document.getElementById('table').rows) {
        columnToReturn.push(row.cells[j].innerHTML);
    }
    return columnToReturn;
}

function setRow(i,a,b,c,d) { // set value of a row
    let value = [a,b,c,d]
    for (const j of Array(4).keys()) {
        setValue(i,j,value[j])
    }
}

function setColumn(j,a,b,c,d) { // set value of a table column
    let value = [a,b,c,d]
    for (const i of Array(4).keys()) {
        setValue(i,j,value[i])
    }
}

function init(){ // initialize the game table
    let tab = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ];

    for (let i=0;i<=3;i++) {
        for (let j=0;j<=3;j++) {
            setValue(i,j,tab[i][j]);
        }
    }
}

function getRandomInt(min, max) { // get random integer between two value
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom2or4(percent) { // get randomized 2 or 4 given a certain percentage
    let randomPercent = getRandomInt(0,100);
    if (randomPercent < percent) {return 2}
    else {return 4}
}

function startGame() { // start a game
    score = 0;
    let counter = 0;
    while (counter < 2) {
        let i = getRandomInt(0,3);
        let j = getRandomInt(0,3);
        let val =  getRandom2or4(85);
        if (isEmpty(i,j)) {
            setValue(i,j,val);
            counter ++;
        }
    }
}

function isEmpty(i,j) { // check if cell is empty
    return getValue(i, j) === '';

}

function moveRight(i) { // move all cells of a row to the right if possible
    let hasChanged = 0;
    let row = showRow(i);
    for (let k = 0; k <= 3; k++){
        for (let j = 0; j <= 3; j++){
            if ((row[j+1] === '') && (row[j] !== '')){
                row[j+1] = row[j];
                row[j] = '';
                hasChanged += 1
            }
        }
    }
    setRow(i, row[0], row[1], row[2], row[3]);
    return hasChanged
}

function moveLeft(i) { // move all cells of a row to the left if possible
    let hasChanged = 0;
    let row = showRow(i);
    for (let k = 0; k <= 3; k++){
        for (let j = 0; j <= 3; j++){
            if ((row[j-1] === '') && (row[j] !== '')){
                row[j-1] = row[j];
                row[j] = '';
                hasChanged += 1;
            }
        }
    }
    setRow(i, row[0], row[1], row[2], row[3]);
    return hasChanged
}

function moveUp(j) { // move all cells of a row up if possible
    let hasChanged = 0;
    let colm = showCol(j);
    for (let k = 0; k <= 3; k++){
        for (let i = 0; i <= 3; i++){
            if ((colm[i-1] === '') && (colm[i] !== '')){
                colm[i-1] = colm[i];
                colm[i] = '';
                hasChanged += 1;
            }
        }
    }
    setColumn(j, colm[0], colm[1], colm[2], colm[3]);
    return hasChanged
}

function moveDown(j) { // move all cells of a row down if possible
    let hasChanged = 0;
    let colm = showCol(j);
    for (let k = 0; k <= 3; k++){
        for (let i = 0; i <= 3; i++){
            if ((colm[i+1] === '') && (colm[i] !== '')){
                colm[i+1] = colm[i];
                colm[i] = '';
                hasChanged += 1;
            }
        }
    }
    setColumn(j, colm[0], colm[1], colm[2], colm[3]);
    return hasChanged
}

function fusionRight(i) { // fusion cells to the right if possible
    let hasChanged = 0;
    let row = showRow(i);
    for (let col = 0; col <=3; col++) {
        if (row[col] === row[col+1] && row[col] !== '') {
            score += 2*Number(getValue(i,col))
            setValue(i,col+1,2*Number(getValue(i,col)));
            row[col+1] = 2*Number(getValue(i,col))
            setValue(i,col,'')
            row[col] = ''
            hasChanged += 1
        }
    }
    return hasChanged;
}

function fusionLeft(i) { // fusion cells to the left if possible
    let hasChanged = 0;
    let row = showRow(i);
    for (let col = 3; col >=0; col--) {
        if (row[col] === row[col-1] && row[col] !== '') {
            score+= 2*Number(getValue(i,col))
            setValue(i,col-1,2*Number(getValue(i,col)));
            row[col+1] = 2*Number(getValue(i,col))
            setValue(i,col,'')
            row[col] = ''
            hasChanged += 1;
        }
    }
    return hasChanged;
}

function fusionUp(j) { // fusion cells up if possible
    let hasChanged = 0;
    let colm = showCol(j);
    for (let row = 3; row >=0; row--) {
        if (colm[row] === colm[row-1] && colm[row] !== '') {
            score+= 2*Number(getValue(row,j))
            setValue(row-1,j,2*Number(getValue(row,j)));
            row[row+1] = 2*Number(getValue(row,j))
            setValue(row,j,'')
            row[row] = ''
            hasChanged += 1
        }
    }
    return hasChanged;
}

function fusionDown(j) { // fusion cells down if possible
    let hasChanged = 0;
    let colm = showCol(j);
    for (let row = 0; row <=3; row++) {
        if (colm[row] === colm[row+1] && colm[row] !== '') {
            score+= 2*Number(getValue(row,j))
            setValue(row+1,j,2*Number(getValue(row,j)));
            row[row+1] = 2*Number(getValue(row,j))
            setValue(row,j,'')
            row[row] = ''
            hasChanged += 1
        }
    }
    return hasChanged;
}

function lineRight(i) {
    let hasChanged;
    hasChanged = moveRight(i);
    hasChanged += fusionRight(i);
    hasChanged += moveRight(i);
    return hasChanged
}

function lineLeft(i) {
    let hasChanged;
    hasChanged = moveLeft(i);
    hasChanged += fusionLeft(i);
    hasChanged += moveLeft(i);
    return hasChanged;
}

function lineUp(j) {
    let hasChanged;
    hasChanged = moveUp(j);
    hasChanged += fusionUp(j);
    hasChanged += moveUp(j);
    return hasChanged;
}

function lineDown(j) {
    let hasChanged;
    hasChanged = moveDown(j);
    hasChanged += fusionDown(j);
    hasChanged += moveDown(j);
    return hasChanged;
}

function right () {
    let hasChanged = 0;
    for(let i=0;i<=3;i++){
        hasChanged += lineRight(i);
    }
    return hasChanged
}

function left () {
    let hasChanged = 0;
    for(let i=0;i<=3;i++){
        hasChanged += lineLeft(i);
    }
    return hasChanged;
}

function up () {
    let hasChanged = 0;
    for(let j=0;j<=3;j++){
        hasChanged += lineUp(j);
    }
    return hasChanged;
}

function down () {
    let hasChanged = 0;
    for(let j=0;j<=3;j++){
        hasChanged += lineDown(j);
    }
    return hasChanged;
}

function hasEmpty() { // check if table has empty cells
    for (let i of Array(4).keys()) {
        for (let j of Array(4).keys()) {
            if (getValue(i,j) === '') {
                return true
            }
        }
    }
    return false
}

function getEmpty() { // get coord of empty a table empty cell
    if (hasEmpty()) {
        while (true) {
            let i = getRandomInt(0,3);
            let j = getRandomInt(0,3);
            if (isEmpty(i,j)) {
                return [i,j]
            }
        }
    }
    return false;
}

function end() { // end the game
    overlayOn();
}

function generateNew() { //generate new number in a random empty cells
    if (hasEmpty()) {
        let emptyCoord = getEmpty();
        let val = getRandom2or4(85);
        setValue(emptyCoord[0],emptyCoord[1],val)
    }
}

function checkPossibilities() { // check if the player still has possibilities to play
    for (let i of Array(4).keys()) {
        for (let j of Array(4).keys()) {
            if(getValue(i,j) === getValue(i,j+1) || getValue(i,j) === getValue(i+1,j) || getValue(i,j) === getValue(i,j-1) || getValue(i,j) === getValue(i-1,j) || hasEmpty()){return true}
        }
    }
    return false;
}

function checkLost () { // check if the player has lost
    if (checkPossibilities() === false) {end()}
}

function setColor(i,j,color) { // set the color of a cell
    let root = document.documentElement;
    root.style.setProperty('--color-x'+i+'y'+j, color)
}

function analyseColor() { // check value of cell to give the equivalent color
    for (let i of Array(4).keys()) {
        for (let j of Array(4).keys()) {
            let value = getValue(i,j);
            if (value === '') {
                setColor(i,j,colorDict[0])
            }
            else {
                setColor(i,j,colorDict[Math.log(Number(value))/Math.log(2)])
            }
        }
    }
}

function updateScore() { // update score and best score
    document.getElementById('score').innerHTML = score;
    document.getElementById('bestScore').innerHTML = getBestScore()
}

function newGame() { // setup for new game
    init();
    startGame();
    analyseColor();
    updateScore();
    overlayOff();
}

function overlayOn() { // activate loose overlay
    document.getElementById("overlay").style.display = "block";
}

function overlayOff() { // deactivate loose overlay
    document.getElementById("overlay").style.display = "none";
}
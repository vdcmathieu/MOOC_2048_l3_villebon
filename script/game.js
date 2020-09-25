let score;
let c0;
let colorDict = ['antiquewhite','#7fffd4','#7bf5d6','#77ebd8','#74e0da','#70d6dd','#6cccdf','#68c2e1', '#64b8e3', '#61ade5', '#5da3e7', '#5999ea', '#558fec', '#5185ee'];

newGame();

document.addEventListener('keydown', function(event) {
    let key = event.key || event.keyCode;

    if(key === 38 || key === 'ArrowUp' || key === 'z' || key === 90) {
        //up
        if (up()>0) {
            generateNew();
        }
        analyseColor();
        updateScore();
        updateStorage();
        checkLost();
    }
    else if(key === 40 || key === 'ArrowDown' || key === 's' || key === 83) {
        //down
        if (down()>0) {
            generateNew()
        }
        analyseColor();
        updateScore();
        updateStorage();
        checkLost();
    }
    else if(key === 37 || key === 'ArrowLeft' || key === 'q' || key === 81) {
        //left
        if (left()>0) {
            generateNew();
        }
        analyseColor();
        updateScore();
        updateStorage();
        checkLost();
    }
    else if(key === 39 || key === 'ArrowRight' || key === 'd' || key === 68) {
        //right
        if (right()>0) {
            generateNew()
        }
        analyseColor();
        updateScore();
        updateStorage();
        checkLost();
    }
    else if (key === 84 || key === 't'){
        // t
    }
});

// Function

function getValue(i,j) {
    if (i < 4 && i >= 0 && j<4 && j>=0) {return document.getElementById('table').rows[i].cells[j].innerHTML}
    else {return false}
}

function setValue(i,j,val) {
    document.getElementById('table').rows[i].cells[j].innerHTML = val;
}

function showRow(i) {
    let rowToReturn = [];
    for (let column of document.getElementById('table').rows[i].cells) {
        rowToReturn.push(column.innerHTML);
    }
    return rowToReturn;
}

function showCol(j) {
    let columnToReturn = [];
    for (let row of document.getElementById('table').rows) {
        columnToReturn.push(row.cells[j].innerHTML);
    }
    return columnToReturn;
}

function setRow(i,a,b,c,d) {
    let value = [a,b,c,d]
    for (const j of Array(4).keys()) {
        setValue(i,j,value[j])
    }
}

function setColumn(j,a,b,c,d) {
    let value = [a,b,c,d]
    for (const i of Array(4).keys()) {
        setValue(i,j,value[i])
    }
}

function init(){
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom2or4(percent) {
    let randomPercent = getRandomInt(0,100);
    if (randomPercent < percent) {return 2}
    else {return 4}
}

function startGame() {
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

function isEmpty(i,j) {
    return getValue(i, j) === '';

}

function moveRight(i) {
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

function moveLeft(i) {
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

function moveUp(j) {
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

function moveDown(j) {
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

function fusionRight(i) {
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

function fusionLeft(i) {
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

function fusionUp(j) {
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

function fusionDown(j) {
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

function hasEmpty() {
    for (let i of Array(4).keys()) {
        for (let j of Array(4).keys()) {
            if (getValue(i,j) === '') {
                return true
            }
        }
    }
    return false
}

function getEmpty() {
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

function end() {
    overlayOn();
}

function generateNew() {
    if (hasEmpty()) {
        let emptyCoord = getEmpty();
        let val = getRandom2or4(85);
        setValue(emptyCoord[0],emptyCoord[1],val)
    }
}

function checkPossibilities() {
    for (let i of Array(4).keys()) {
        for (let j of Array(4).keys()) {
            if(getValue(i,j) === getValue(i,j+1) || getValue(i,j) === getValue(i+1,j) || getValue(i,j) === getValue(i,j-1) || getValue(i,j) === getValue(i-1,j) || hasEmpty()){return true}
        }
    }
    return false;
}

function checkLost () {
    if (checkPossibilities() === false) {end()}
}

function setColor(i,j,color) {
    let root = document.documentElement;
    root.style.setProperty('--color-x'+i+'y'+j, color)
}

function analyseColor() {
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

function updateScore() {
    document.getElementById('score').innerHTML = score;
}

function newGame() {
    init();
    startGame();
    analyseColor();
    updateScore();
    overlayOff();
}

function overlayOn() {
    document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
    document.getElementById("overlay").style.display = "none";
}

// Test Function

function test1() {
    console.log('test 1');
}

function test2() {
    document.getElementById("challenge9").innerHTML = "Challenge 9"
}

function test3() {
    score = Number(document.getElementById("score").innerHTML);
    document.getElementById("score").innerHTML = score + 1
}

function test4() {
    c0 = document.getElementById('table').rows[0].cells[0].innerHTML;
    console.log("value of (0,0) cell: "+c0);
}

function test5() {
    document.getElementById('table').rows[0].cells[0].innerHTML = "#";
}

function test6() {
    console.log(getValue(1,1));
    console.log(getValue(2,2));
    console.log(getValue(3,3));
}

function test7() {
    setValue(0,0,'P')
    setValue(1,1,"Q")
    setValue(2,2,'R')
    setValue(3,3,"S")
}

function test8() {
    console.log('Row')
    console.log(showRow(0));
    console.log(showRow(1));
    console.log(showRow(2));
    console.log(showRow(3));
}

function test9() {
    console.log('Column');
    console.log(showCol(0));
    console.log(showCol(1));
    console.log(showCol(2));
    console.log(showCol(3));
}

function test10() {
    setRow(0,1,2,3,4)
    setRow(1,5,6,7,8)
    setRow(2,9,10,11,12)
    setRow(3,13,14,15,16)
}

function test11() {
    init()
}

function test12() {
    let i = getRandomInt(0,3)
    let j = getRandomInt(0,3)
    setValue(i,j,'@')
}

function test13(){
    for(i=0;i<=3;i++){
        for(j=0;j<=3;j++){
            if(isEmpty (i,j)){
                console.log("la case ["+i+"]["+j+"] est vide");
            }
        }
    }
}

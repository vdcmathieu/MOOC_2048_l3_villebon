let score;
let c0;

console.log("Bonjour");

document.addEventListener('keydown', function(event) {
    if(event.keyCode === 38) {
        console.log('haut');
        up()
        generateNew()
    }
    else if(event.keyCode === 40) {
        console.log('bas');
        down()
        generateNew()
    }
    else if(event.keyCode === 37) {
        console.log('gauche');
        left()
        generateNew()
    }
    else if(event.keyCode === 39) {
        console.log('droit');
        right()
        generateNew()
    }
    else if (event.keyCode === 84){
        init();
        startGame();
    }
});

// Function

function getValue(i,j) {
    return document.getElementById('table').rows[i].cells[j].innerHTML;
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
    var tab = [
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
    if (getValue(i,j) === '') {return true}
    return false
}

function moveRight(i) {
    var hasChanged = 0;
    var row = showRow(i);
    for (var k = 0; k <= 3; k++){
        for (var j = 0; j <= 3; j++){
            if ((row[j+1] === '') && (row[j] !== '')){
                row[j+1] = row[j];
                row[j] = '';
                hasChanged = 1
            }
        }
    }
    setRow(i, row[0], row[1], row[2], row[3]);
    return hasChanged
}

function moveLeft(i) {
    var hasChanged = 0;
    var row = showRow(i);
    for (var k = 0; k <= 3; k++){
        for (var j = 0; j <= 3; j++){
            if ((row[j-1] === '') && (row[j] !== '')){
                row[j-1] = row[j];
                row[j] = '';
                hasChanged = 1;
            }
        }
    }
    setRow(i, row[0], row[1], row[2], row[3]);
    return hasChanged
}

function moveUp(j) {
    var hasChanged = 0;
    var colm = showCol(j);
    for (var k = 0; k <= 3; k++){
        for (var i = 0; i <= 3; i++){
            if ((colm[i-1] === '') && (colm[i] !== '')){
                colm[i-1] = colm[i];
                colm[i] = '';
                hasChanged = 1;
            }
        }
    }
    setColumn(j, colm[0], colm[1], colm[2], colm[3]);
    return hasChanged
}

function moveDown(j) {
    var hasChanged = 0;
    var colm = showCol(j);
    for (var k = 0; k <= 3; k++){
        for (var i = 0; i <= 3; i++){
            if ((colm[i+1] === '') && (colm[i] !== '')){
                colm[i+1] = colm[i];
                colm[i] = '';
                hasChanged = 1;
            }
        }
    }
    setColumn(j, colm[0], colm[1], colm[2], colm[3]);
    return hasChanged
}

function fusionRight(i) {
    let row = showRow(i);
    for (let col = 0; col <=3; col++) {
        if (row[col] === row[col+1] && row[col] !== '') {
            setValue(i,col+1,2*Number(getValue(i,col)));
            row[col+1] = 2*Number(getValue(i,col))
            setValue(i,col,'')
            row[col] = ''
        }
    }
}

function fusionLeft(i) {
    let row = showRow(i);
    for (let col = 3; col >=0; col--) {
        if (row[col] === row[col-1] && row[col] !== '') {
            setValue(i,col-1,2*Number(getValue(i,col)));
            row[col+1] = 2*Number(getValue(i,col))
            setValue(i,col,'')
            row[col] = ''
        }
    }
}

function fusionUp(j) {
    let colm = showCol(j);
    for (let row = 3; row >=0; row--) {
        if (colm[row] === colm[row-1] && colm[row] !== '') {
            setValue(row-1,j,2*Number(getValue(row,j)));
            row[row+1] = 2*Number(getValue(row,j))
            setValue(row,j,'')
            row[row] = ''
        }
    }
}

function fusionDown(j) {
    let colm = showCol(j);
    for (let row = 0; row <=3; row++) {
        if (colm[row] === colm[row+1] && colm[row] !== '') {
            setValue(row+1,j,2*Number(getValue(row,j)));
            row[row+1] = 2*Number(getValue(row,j))
            setValue(row,j,'')
            row[row] = ''
        }
    }
}

function lineRight(i) {
    var hasChanged = 0;
    hasChanged = moveRight(i);
    hasChanged = fusionRight(i);
    hasChanged = moveRight(i);
    return hasChanged
}

function lineLeft(i) {
    moveLeft(i);
    fusionLeft(i);
    moveLeft(i);
}

function lineUp(j) {
    moveUp(j);
    fusionUp(j);
    moveUp(j);
}

function lineDown(j) {
    moveDown(j);
    fusionDown(j);
    moveDown(j);
}

function right () {
    var hasChanged = 0;
    for(i=0;i<=3;i++){
        hasChanged = lineRight(i);
    }
    return hasChanged
}

function left () {
    for(i=0;i<=3;i++){
        lineLeft(i);
    }
}

function up () {
    for(j=0;j<=3;j++){
        lineUp(j);
    }
}

function down () {
    for(j=0;j<=3;j++){
        lineDown(j);
    }
}

function hasEmpty() {
    for (let i = 0; 0 <= 3; i++) {
        for (let j = 0; 0 <= 3; j++) {
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
    else {return false}
}

function end() {
    alert('You loose !')
}

function generateNew() {
    let emptyCoord = getEmpty();
    if (emptyCoord === false) {
        end()
    }
    else {
        let val = getRandom2or4(85);
        setValue(emptyCoord[0],emptyCoord[1],val)
    }
}

// Test Function

function test1() {
    console.log('test 1');
}

function test2() {
    document.getElementById("chalenge9").innerHTML = "Chalenge 9"
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

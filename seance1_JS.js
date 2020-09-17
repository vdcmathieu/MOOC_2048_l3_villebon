let score;
let c0;

console.log("Bonjour");

document.addEventListener('keydown', function(event) {
    if(event.keyCode === 38) {
        console.log('haut');
        moveUp(0);
        fusionUp(0);
        moveUp(1);
        fusionUp(1);
        moveUp(2);
        fusionUp(2);
        moveUp(3);
        fusionUp(3);
    }
    else if(event.keyCode === 40) {
        console.log('bas');
        moveDown(0);
        fusionDown(0);
        moveDown(1);
        fusionDown(1);
        moveDown(2);
        fusionDown(2);
        moveDown(3);
        fusionDown(3);
    }
    else if(event.keyCode === 37) {
        console.log('gauche');
        moveLeft(0);
        fusionLeft(0);
        moveLeft(1);
        fusionLeft(1);
        moveLeft(2);
        fusionLeft(2);
        moveLeft(3);
        fusionLeft(3);
    }
    else if(event.keyCode === 39) {
        console.log('droit');
        moveRight(0);
        fusionRight(0);
        moveRight(1);
        fusionRight(1);
        moveRight(2);
        fusionRight(2);
        moveRight(3);
        fusionRight(3);
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
    var row = showRow(i);
    for (var k = 0; k <= 3; k++){
        for (var j = 0; j <= 3; j++){
            if ((row[j+1] === '') && (row[j] !== '')){
                row[j+1] = row[j];
                row[j] = '';
            }
        }
    }
    setRow(i, row[0], row[1], row[2], row[3]);
}

function moveLeft(i) {
    var row = showRow(i);
    for (var k = 0; k <= 3; k++){
        for (var j = 0; j <= 3; j++){
            if ((row[j-1] === '') && (row[j] !== '')){
                row[j-1] = row[j];
                row[j] = '';
            }
        }
    }
    setRow(i, row[0], row[1], row[2], row[3]);
}

function moveUp(j) {
    var colm = showCol(j);
    for (var k = 0; k <= 3; k++){
        for (var i = 0; i <= 3; i++){
            if ((colm[i-1] === '') && (colm[i] !== '')){
                colm[i-1] = colm[i];
                colm[i] = '';
            }
        }
    }
    setColumn(j, colm[0], colm[1], colm[2], colm[3]);
}

function moveDown(j) {
    var colm = showCol(j);
    for (var k = 0; k <= 3; k++){
        for (var i = 0; i <= 3; i++){
            if ((colm[i+1] === '') && (colm[i] !== '')){
                colm[i+1] = colm[i];
                colm[i] = '';
            }
        }
    }
    setColumn(j, colm[0], colm[1], colm[2], colm[3]);
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

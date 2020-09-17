let score;
let c0;

console.log("Bonjour");

document.addEventListener('keydown', function(event) {
    if(event.keyCode === 38) {
        console.log('haut');
        moveUp(0);
        moveUp(1);
        moveUp(2);
        moveUp(3);
    }
    else if(event.keyCode === 40) {
        console.log('bas');
        moveDown(0);
        moveDown(1);
        moveDown(2);
        moveDown(3);
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
        //fusionRight(0);
        moveRight(1);
        //fusionRight(1);
        moveRight(2);
        //fusionRight(2);
        moveRight(3);
        //fusionRight(3);
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
    let newRow = ['','','',''];
    let row = showRow(i);
    let checker = false;
    for (let j of row) {
        if (j !== '') {checker = true}
    }
    while (checker === true) {
        console.log('Row number'+i+': '+row)
        for (let colm = 3;colm >= 0;colm--) {
            if (row[colm+1] === '' && row[colm] !== '' && colm+1 < row.length) {
                newRow[colm+1] = row[colm];
                row[colm+1] = row[colm];
                row[colm] = '';
            }
            else {newRow[colm] = row[colm]}
        }
        checker = false
        for (let colm = 0;colm <= 3;colm++) {
            if (newRow[colm] !== '' && newRow[colm+1] === '') {
                checker = true
            }
        }
        console.log('New row number'+i+': '+newRow)
    }
    setRow(i,newRow[0],newRow[1],newRow[2],newRow[3])
}

function moveLeft(i) {
    let newRow = ['','','',''];
    let row = showRow(i);
    console.log('Row number'+i+': '+row)
    for (let colm = 0;colm <= 3;colm++) {
        if (row[colm-1] === '' && row[colm] !== '' && colm-1 < row.length) {
            newRow[colm-1] = row[colm];
            row[colm-1] = row[colm];
            row[colm] = '';
        }
        else {newRow[colm] = row[colm]}
    }
    console.log('New row number'+i+': '+newRow)
    setRow(i,newRow[0],newRow[1],newRow[2],newRow[3])
}

function moveUp(j) {
    let newColumn = ['','','',''];
    let column = showCol(j);
    console.log('Col '+j+': '+column);
    for (let row = 0; row <= 3;row++) {
        if (column[row-1] === '' && column[row] !== '' && row-1 < column.length) {
            newColumn[row-1] = column[row];
            column[row-1] = column[row];
            column[row] = '';
        }
        else {newColumn[row] = column[row]}
    }
    console.log('New col '+j+': '+newColumn);
    setColumn(j,newColumn[0],newColumn[1],newColumn[2],newColumn[3])
}

function moveDown(j) {
    let newColumn = ['','','',''];
    let column = showCol(j);
    console.log('Col '+j+': '+column);
    for (let row = 3; row >= 0;row--) {
        if (column[row+1] === '' && column[row] !== '' && row+1 < column.length) {
            newColumn[row+1] = column[row];
            column[row+1] = column[row];
            column[row] = '';
        }
        else {newColumn[row] = column[row]}
    }
    console.log('New col '+j+': '+newColumn);
    setColumn(j,newColumn[0],newColumn[1],newColumn[2],newColumn[3])
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

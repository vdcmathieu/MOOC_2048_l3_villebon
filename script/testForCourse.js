// Test Function
// Those are the function requested to complete the different challenge of the MOOC course but not usefull to the good functioning of the game.

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

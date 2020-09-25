// Manage the game

newGame(); // start game

document.addEventListener('keydown', function(event) {
    let key = event.key || event.keyCode;

    if(key === 38 || key === 'ArrowUp' || key === 'z' || key === 90) {
        //up
        if (up()>0) {
            generateNew();
        }
        afterMovement()
    }
    else if(key === 40 || key === 'ArrowDown' || key === 's' || key === 83) {
        //down
        if (down()>0) {
            generateNew()
        }
        afterMovement()
    }
    else if(key === 37 || key === 'ArrowLeft' || key === 'q' || key === 81) {
        //left
        if (left()>0) {
            generateNew();
        }
        afterMovement()
    }
    else if(key === 39 || key === 'ArrowRight' || key === 'd' || key === 68) {
        //right
        if (right()>0) {
            generateNew()
        }
        afterMovement()
    }
    else if (key === 84 || key === 't'){
        // t
    }
});
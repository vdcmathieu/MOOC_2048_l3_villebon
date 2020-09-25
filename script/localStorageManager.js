//Local storage manager

//Function used to maintain the local storage and store value such as the user's best score

displayBestScore();

function updateStorage() { //update local Storage with updated value
    setBestScore();
}

function getBestScore() { //get best score variable from local storage
    return getVariable('bestScore')
}

function setBestScore() { //check if current score > than best score, if so update the local storage variable
    if (Number(document.getElementById('score').innerHTML) > getBestScore()) {
        setVariable('bestScore',Number(document.getElementById('score').innerHTML))
    }
}

function getVariable(variable) { //read a variable in the local storage
    return localStorage.getItem(variable) || '0';
}

function setVariable (variable, value) { //write a variable in the local storage
    localStorage.setItem(variable,value)
}
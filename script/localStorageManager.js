displayBestScore();

function updateStorage() {
    displayBestScore();
    setBestScore();
}

function getBestScore() {
    return getVariable('bestScore')
}

function displayBestScore() {
    document.getElementById('bestScore').innerHTML = getBestScore()
}

function setBestScore() {
    if (Number(document.getElementById('score').innerHTML) > getBestScore()) {
        setVariable('bestScore',Number(document.getElementById('score').innerHTML))
    }
}

function getVariable(variable) {
    return localStorage.getItem(variable) || '0';
}

function setVariable (variable, value) {
    localStorage.setItem(variable,value)
}
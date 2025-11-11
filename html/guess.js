const guess = document.getElementById("guess");
const go = document.getElementById("go");
const score = document.getElementById("high-score");
const response = document.getElementById("response");
const dotsss = document.getElementsByClassName('dot');
const line = document.getElementById('numberline');
let rannum = 0
let highscore = 0
let userguess = 0
let clear_dot = 0
let stored_high_score = 0

const getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const clearDot = () => {
    for (let i = dotsss.length - 1; i >= 2; i--) {
        const elementToRemove = dotsss[i];
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
    const nummm = document.getElementsByClassName('numm');
    for (let i = nummm.length - 1; i >= 0; i--) {
        const elementToRemove = nummm[i];
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
}

const restart = () => {
    rannum = getRandomInteger(1,100);
    console.log("highscore: " + highscore + "; score.innerText: " + score.innerText)
    if((highscore < stored_high_score) || stored_high_score == 0){
        score.innerText = "High Score: " + highscore;
        stored_high_score = highscore;
    }
    highscore = 0;
    clear_dot = 1; //this is here instead of the function so that it only clears once you enter a new value
}

const placeNum = (value) => {
    const numm = document.createElement('p');  // Create a new element each time
    numm.className = 'numm oooh-baby-regular';
    line.appendChild(numm);
    numm.innerText = value;
    if (value % 2 == 0){
        numm.style.top = '2px';
    }else{
        numm.style.top = '-20px';
    }
    numm.style.left = "calc(" + (value*1.005) + "% - 15px)";
    numm.style.font = "0.5em"
}

const placeDot = (value, comp) => { //value = guess, comp = acctual number
    const line = document.getElementById('numberline');
    const dott = document.createElement('span');
    dott.className = 'dot';
    line.appendChild(dott);
    for (let i = 0; i < dotsss.length; i++) {
        dotsss[i].style.width = (line.clientWidth / 100) + "px";
        dotsss[i].style.height = (line.clientWidth / 100) + "px";
    }
    if(value > comp){
        dott.style.backgroundColor = "#DD8A6C";
    }
    else if(value < comp){
        dott.style.backgroundColor = "#A62700";
    }else{
        dott.style.backgroundColor = "#EFBF04";
    }
    dott.style.position = "absolute";
    dott.style.top = "-4.5px";
    dott.style.left = "calc(" + (value*1.005) + "% - 10px)";
}

go.addEventListener("click", () => {
    userguess = guess.value;
    if (clear_dot == 1){
        clearDot();
        clear_dot = 0;
    }
    placeDot(userguess, rannum);
    placeNum(userguess);
    if (userguess == rannum){
        response.innerText = "You Got it!";
        guess.value = '';
        highscore ++;
        restart();
    }else if(userguess < rannum){
        response.innerText = "Too Low! Try Again!"
        guess.value = '';
        highscore ++;
    }else if(userguess > rannum){
        response.innerText = "Too High! Try Again!"
        guess.value = '';
        highscore ++;
    }else{
        response.innerText = "You Entered an Invalid Sequence! Try Again!"
        guess.value = '';
    }
});

guess.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        go.click();      // Programmatically click the button
    }
});

document.getElementById('response').addEventListener('keypress', function(event) {
    const allowedChars = /[0-9]/; // Regular expression for allowed characters
    const char = String.fromCharCode(event.charCode);

    if (!allowedChars.test(char)) {
        event.preventDefault(); // Prevent the character from being entered
    }
});
document.getElementById('guess').addEventListener('input', function(event) {
    // Remove any non-digit characters
    this.value = this.value.replace(/[^0-9]/g, '');
});

restart();
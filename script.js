let mainContainer = document.querySelector(".game-container");
let gameBtns = document.querySelectorAll(".color-btns");
let roundHeading = document.querySelector("h2");
let roundNo = document.querySelector(".round-no")
let startBtn = document.querySelector("#start");
let gameMeter = document.querySelector(".game-info");

let round = 1;
let gamePattern = [];
let userClickedPattern = [];
let delayBase = 1500;
let colorPattern = ["red", "blue", "green", "yellow"];
// Start Game
startBtn.addEventListener("click", () => {
    userClickedPattern = [];
    startBtn.disabled = true;
    btnDisabled();
    patternGen();
})
// pattern Generator 
function patternGen() {
    let randomColor = colorPattern[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    playPattern();
}
// play pattern
function playPattern() {
    for (let i = 0; i < gamePattern.length; i++) {
        let delay = delayBase * (i+1);
        setTimeout(() => {
            let indexColor = document.getElementById(gamePattern[i]);
            indexColor.classList.add("active");
            setTimeout(() => {
                indexColor.classList.remove("active");
            }, delayBase / 2);
        }, delay)
    }
    setTimeout(() => {
        btnEnabled();
    }, delayBase * gamePattern.length + delayBase / 2);
}
// button disabled
function btnDisabled() {
    for (btns of gameBtns) {
        btns.disabled = true;
    }
}
// button enabled
function btnEnabled() {
    for (btns of gameBtns) {
        btns.disabled = false;
    }
};
// user click pattern 
function patternChecker(array1, array2) {
    let currentIndex = array2.length - 1;
    if (array1[currentIndex] !== array2[currentIndex]) {
        return false;
    }
    if (array1.length === array2.length) {
        return true;
    };
    return "continue";
}
// user click event and decider{
for (gameBtn of gameBtns) {
    gameBtn.addEventListener("click", (e) => {
        userClickedPattern.push(e.target.id);
        let result = patternChecker(gamePattern, userClickedPattern);
        if(result === false) {
            alert("Game Over");
            roundHeading.style.fontSize = "1.5rem";
            roundHeading.innerText = "Your score is ";
            roundNo.innerText = `${round-1}`;
            setTimeout(() => {
                location.reload();
            }, 2000);
        } 
        else if (result === true) {
            round++;
            roundNo.innerText = `${round}`;
            userClickedPattern = [];
            btnDisabled();
            setTimeout(() => {
                patternGen();
            }, 500);
        }
    });
} 
// user click pattern 
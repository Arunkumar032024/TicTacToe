// initialize constant variables
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const player = document.querySelector(".symbol-box .turn");
const btns = document.querySelectorAll(".buttons button");
const resetBtn = document.querySelector(".restart");
const choosePlayerBtn = document.querySelector(".choose-player-btn");
const resultBox = document.querySelector(".result");
const continueBtns = document.querySelectorAll(".continue");
const restartBtn = document.querySelector("#restart");

// initialize variables
let turnX = true;
let [player1, player2] = ["", ""];
let [player1Score, player2Score] = [0, 0];
let tie = 0;
let tieScore = 0;

// add event on choose player to start the game 
choosePlayerBtn.addEventListener("click", () => {
    player1 = prompt("Enter the first player name: ");
    player2 = prompt("Enter the second player name: ");
    console.log(player1, player2)
    if(player1 != "" && player2 != ""){
        document.querySelector("#user-1").innerText = player1;
        document.querySelector("#user-2").innerText = player2;
        btns.forEach(btn => { btn.classList.remove("pointer-none") });
        document.querySelector(".c-1").classList.remove("pointer-none");
        choosePlayerBtn.style.display = "none"
        document.querySelector(".symbol-box .player-turn").classList.remove("hide");
        player.innerText = player1;
        btnEnabled();
    }else{
        alert("Please choose player.")
    }   
})

// iterate each button 
btns.forEach( btn => {
    btn.addEventListener("click", ()=>{
        if(turnX){
            player.innerText = player2;
            btn.innerText = "X";
            btn.style.color = "#ffff80";
            turnX = false;
        }else{
            player.innerText = player1;
            btn.innerText = "O";
            btn.style.color = "#ff0080";
            turnX = true;
        }
        btn.disabled = true;
        checkWinner();
        if(tie === 9){
            tieScore++;
            document.querySelector(".controls #tie-score").innerText = tieScore;
            tie = 0;
            winnerAnnouncement("Tie")
        }
   })
})

// define checkWinner() function to check who is winner 
function checkWinner(){
    for(let pattern of winPatterns){
        let pos1Val = btns[pattern[0]].innerText;
        let pos2Val = btns[pattern[1]].innerText;
        let pos3Val = btns[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos1Val){
                if(pos1Val === 'X'){
                    winnerAnnouncement(player1);
                    player1Score++;
                    updateScore(player1Score, player2Score)
                    btnDisabled();
                    tie = 0;
                    return;
                }else{
                    winnerAnnouncement(player2);
                    player2Score++;
                    updateScore(player1Score, player2Score)
                    btnDisabled();
                    tie = 0;
                    return;
                }
                
            }
        }
    }
    tie++;
}

// define the winnerAnnouncement() function that is announce the result 
function winnerAnnouncement(winner){
        showWinner(winner)   
        if(winner !== "Tie"){
            let speech = new SpeechSynthesisUtterance(`Congratulation ${winner}`);
            window.speechSynthesis.speak(speech);
        }else{
            let speech = new SpeechSynthesisUtterance(`Game was ${winner}`);
            window.speechSynthesis.speak(speech);
        }
}

// define showWinner() function to show the result 
function showWinner(winner){
    if(winner !== "Tie"){
        resultBox.classList.remove('hide');
        resultBox.querySelector('h3').innerText = `Congratulation ${winner}!`;
    }else{
        resultBox.classList.remove('hide');
        resultBox.querySelector(".restart").classList.add("hide")
        resultBox.querySelector('h3').innerText = `Game was ${winner}!`;
    }   
}

// define updateScore() function to updateScore the score of players 
function updateScore(p1, p2){
    document.querySelector("#user-1-score").innerText = p1;
    document.querySelector("#user-2-score").innerText = p2;
}

// define btnDisabled() function to disabled each btn 
function btnDisabled(){
    btns.forEach(btn => {
        btn.disabled = true;
        btn.classList.add("pointer-none")
    })
}

// define btnEnabled() function to enable each btn 
function btnEnabled(){
    btns.forEach(btn => {
        btn.disabled = false;
        btn.innerText = "";
        btn.classList.remove("pointer-none")
    })
}


// iterate both continue button and add event on both. 
continueBtns.forEach(conBtn => {
    conBtn.addEventListener('click', ()=>{
        resultBox.classList.add("hide");
        resultBox.querySelector(".restart").classList.remove("hide")
        btnEnabled();
        tie = 0;
    })
})

// add event on resetbtn to reset the game and score 
resetBtn.addEventListener("click", ()=>{
    let ans = confirm("If you restart the game your score will be 0:")
    if(ans){
        resultBox.classList.add("hide");
        choosePlayerBtn.style.display = "block"
        btnDisabled();
        document.querySelector(".c-1").classList.add("pointer-none");
        btns.forEach(btn => {btn.innerText = ""})
        player1Score = 0
        player2Score = 0
        updateScore(player1Score, player2Score)
        player1 = ""
        player2 = ""
        document.querySelector(".symbol-box .player-turn").classList.add("hide");
        tie = 0;
        tieScore = 0;
        document.querySelector(".controls #tie-score").innerText = tieScore;
        document.querySelector("#user-1").innerText = "player1"
        document.querySelector("#user-2").innerText = "player2";
    }
})



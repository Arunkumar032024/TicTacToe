let btns = document.querySelectorAll(".buttons button"),
resetBtn = document.querySelector(".restart"),
turnX = true,
[player1, player2] = ["", ""];
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
],
player = document.querySelector(".symbol-box .turn"),
choosePlayerBtn = document.querySelector(".choose-player-btn"),
resultBox = document.querySelector(".result"),
continueBtns = document.querySelectorAll(".continue");

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
   })
})


function checkWinner(){
    for(let pattern of winPatterns){
        let pos1Val = btns[pattern[0]].innerText;
        let pos2Val = btns[pattern[1]].innerText;
        let pos3Val = btns[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos1Val){
                if(pos1Val === 'X'){
                    winnerAnnouncement(player1);
                }else{
                    winnerAnnouncement(player2);
                }
                btnDisabled();
            }
        }
    }
}

choosePlayerBtn.addEventListener("click", () => {
    player1 = prompt("Enter the first player name: ");
    player2 = prompt("Enter the second player name: ");
    console.log(player1, player2)
    if(player1 != "" && player2 != ""){
        document.querySelector("#user-1").innerText = player1;
        document.querySelector("#user-2").innerText = player2;
        btns.forEach(btn => { btn.classList.remove("pointer-none") });
        document.querySelector(".c-1").classList.remove("pointer-none");
        choosePlayerBtn.style.display = 'none'
        document.querySelector(".symbol-box .player-turn").classList.remove("hide");
        player.innerText = player1;
    }else{
        alert("Please choose player.")
    }   
})



function winnerAnnouncement(winner){
    if(winner !== "Tie"){
        showWinner(winner)   
        let speech = new SpeechSynthesisUtterance(`Congratulation ${winner}`);
        window.speechSynthesis.speak(speech);
    }else{
        showWinner(winner)   
        let speech = new SpeechSynthesisUtterance(`Game was ${winner}`);
        window.speechSynthesis.speak(speech);
    }
    
}

function btnDisabled(){
    btns.forEach(btn => {
        btn.disabled = true;
        btn.classList.add("pointer-none")
    })
}

function showWinner(winner){
    if(winner !== "Tie"){
        resultBox.classList.remove('hide');
        resultBox.querySelector('h3').innerText = `Congratulation ${winner}!`;
    }else{
        resultBox.classList.remove('hide');
        resultBox.querySelector('h3').innerText = `Game was ${winner}!`;
    }
    
}

function btnEnabled(){
    btns.forEach(btn => {
        btn.disabled = false;
        btn.innerText = "";
        btn.classList.remove("pointer-none")
    })
}

continueBtns.forEach(conBtn => {
    conBtn.addEventListener('click', ()=>{
        resultBox.classList.add("hide");
        btnEnabled();
        console.log(conBtn)
    })
})
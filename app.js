const choosePlayerBtn = document.querySelector(".choose-player-btn"),
btns = document.querySelectorAll(".buttons button"),
player = document.querySelector(".symbol-box .turn"),
winPatterns = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
let [player1, player2, turn] = ["", "", true];
let player1btn = [];
let player2btn = [];

function checkWinner(){
    
}


function playerChoice(e){
    console.log(e);
    if(e.innerText === 'O'){
        player1btn.push(e.value)
        player.innerText = player1;
        console.log("player1", player1btn)
    }else{
        player2btn.push(e.value)
        player.innerText = player2;
        console.log("player2", player2btn)
    }
}

function playerTurn() {
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (turn) {
                btn.innerText = 'X';
                btn.style.color = "#ff0";
                btn.setAttribute("btn", "disabled");
                btn.classList.add("pointer-none")
                turn = false;
                playerChoice(btn);
            } else {
                btn.innerText = 'O';
                btn.style.color = "#f00";
                btn.setAttribute("btn", "disabled");
                btn.classList.add("pointer-none")
                turn = true;
                playerChoice(btn);
            }
        })
    })
}



choosePlayerBtn.addEventListener("click", () => {
    player1 = prompt("Enter the first player name: ");
    player2 = prompt("Enter the second player name: ");
    console.log(player1, player2)
    if(player1 !== null && player2 !== null){
        document.querySelector("#user-1").innerText = player1;
        document.querySelector("#user-2").innerText = player2;
        btns.forEach(btn => { btn.classList.remove("pointer-none") })
        playerTurn();
        choosePlayerBtn.style.display = 'none'
        document.querySelector(".symbol-box .player-turn").classList.remove("hide");
        player.innerText = player1;
    }else{
        alert("Please choose player.")
    }
    
    
})
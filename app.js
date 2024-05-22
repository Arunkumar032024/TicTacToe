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
choosePlayerBtn = document.querySelector(".choose-player-btn");

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
                console.log("winner", pos1Val)
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
        btns.forEach(btn => { btn.classList.remove("pointer-none") })
        choosePlayerBtn.style.display = 'none'
        document.querySelector(".symbol-box .player-turn").classList.remove("hide");
        player.innerText = player1;
    }else{
        alert("Please choose player.")
    }   
})


// const 
// resultBox = document.querySelector(".result"),
// resultBoxh3 = document.querySelector(".result h3"),
// continueBtn = document.querySelector(".result button"),
// btns = document.querySelectorAll(".buttons button"),
// 
// winPatterns = [
//     ['1', '2', '3'],
//     ['4', '5', '6'],
//     ['7', '8', '9'],
//     ['1', '4', '7'], 
//     ['2', '5', '8'], 
//     ['3', '6', '9'], 
//     ['1', '5', '9'], 
//     ['3', '5', '7'],
//     ['3', '2', '1'],
//     ['6', '5', '4'],
//     ['9', '8', '7'],
//     ['7', '4', '1'],
//     ['8', '5', '2'],
//     ['9', '6', '3'],
//     ['9', '5', '1'],
//     ['7', '5', '3']
// ];
// let [player1, player2, turn] = ["", "", true];
// let player1btn = [];
// let player2btn = [];


// function winnerAnnouncement(winner){
//     let speech = new SpeechSynthesisUtterance(`Congratulation ${winner}`);
//     window.speechSynthesis.speak(speech);
// }


// function checkWinner(btn, p){
//     if(btn.length === 3){
//         for(let pattern of winPatterns){
//             let pos1Val = pattern[0]
//             let pos2Val = pattern[1]
//             let pos3Val = pattern[2]
//             // console.log(pos1Val, pos2Val, pos3Val)    
//             if(btn[0] === pos1Val && btn[1] === pos2Val && btn[2] === pos3Val){
//                 resultBox.classList.remove("hide");
//                 resultBoxh3.innerText = `Congratulation ${p}`;
//                 winnerAnnouncement(p)
//             }
//         }    
//     }else if(btn.length === 4){
//         let s = 1;
//         for(let pattern of winPatterns){
//             let pos1Val = pattern[0]
//             let pos2Val = pattern[1]
//             let pos3Val = pattern[2]
//             // console.log(pos1Val, pos2Val, pos3Val)    
//             let flag = 0; 
//             for(let b of btn){
//                 if(b === pos1Val || b === pos2Val || b === pos3Val){
//                     flag++;
//                 }
//             }
//             if(flag === 3 && s === 1){
//                 resultBox.classList.remove("hide");
//                 resultBoxh3.innerText = `Congratulation ${p}`;
//                 winnerAnnouncement(p)
//                 s++;
//             } 
//         }   
        
//     }
        
// }

// function playerChoice(e){
//     if(e.innerText === 'O'){
//         player1btn.push(e.value)
//         player.innerText = player1;
//         checkWinner(player1btn, player2)
//     }else{
//         player2btn.push(e.value)
//         player.innerText = player2;
//         checkWinner(player2btn, player1)
//     }
// }

// function playerTurn(){
//     btns.forEach(btn => {
//         btn.addEventListener('click', () => {
//             if (turn) {
//                 btn.innerText = 'X';
//                 btn.style.color = "#ff0";
//                 btn.setAttribute("btn", "disabled");
//                 btn.classList.add("pointer-none")
//                 turn = false;
//                 playerChoice(btn);
//             } else {
//                 btn.innerText = 'O';
//                 btn.style.color = "#f00";
//                 btn.setAttribute("btn", "disabled");
//                 btn.classList.add("pointer-none")
//                 turn = true;
//                 playerChoice(btn);
//             }
//         })
//     })
// }




// continueBtn.addEventListener("click", ()=>{
//     resultBox.classList.add("hide")
//     playerTurn();  
// })
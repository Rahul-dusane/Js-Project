
const marks = localStorage.getItem("selectMark") || "X";
let count = 0;
let xMoves = [];
let oMoves = [];

let xcount = 0; 
let tcount = 0;
let ocount = 0;


const winPattern = [
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[2,5,8],[3,6,9],
    [1,5,9],[3,5,7]
];

window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("refresh-icon").addEventListener("click",() => {
        count = 0;
        xMoves = [];
        oMoves = [];

        tic_tac_teo_button("grid-container");
    });

    document.querySelector(".turn1").innerText = marks;

    window.playerMark = marks;
    window.cpuMark = marks === "X" ? "O" : "X";
    
    tic_tac_teo_button("grid-container");
    scoreBorde("grid-container2");

    // play with CPU
    startVsCPU();
});

function tic_tac_teo_button(containerId){
    const container = document.getElementById(containerId);

    container.innerHTML = "";

    for(let i = 1; i <= 9; i++){
        const button = document.createElement("button");
        button.innerText = "";
        button.className = "grid-button";
        button.dataset.num = i;
        
        button.addEventListener("click",() => {
            if((button.innerText !== "")) return ;

            const sound = document.getElementById("buttonAudio");
            if(sound){
                sound.pause();
                sound.currentTime = 0;
                sound.play().catch(() => {});
            }

            const marksToBox = count % 2 === 0 ? playerMark : cpuMark;
            button.innerText = marksToBox;
            button.disabled = true;

            const moveNum = parseInt(button.dataset.num);
            
            if(marksToBox.toUpperCase() === "X"){
                xMoves.push(moveNum);
                const win = checkWinner(xMoves);
                if(win){
                    highlightWinning(win);
                    disabledAllButtons();
                }
            }else{
                oMoves.push(moveNum);
                const win = checkWinner(oMoves);
                if(win){
                    highlightWinning(win);
                    disabledAllButtons();
                }
            }

            count++;

            // CPU will make the move
            const isVsCPU = localStorage.getItem("vsCPU") === "true";
            if(isVsCPU && (count % 2 !== 0)){
                setTimeout(makeCPUMove, 500);
            }

            
            if (count === 9 && !checkWinner(xMoves) && !checkWinner(oMoves)) {
                tcount++;
                scoreBorde("grid-container2");
                showPopup("🤝 It's a Tie!");
                disabledAllButtons();

                const winSound = document.getElementById("winAudio");
                if(winSound){
                    winSound.pause();
                    winSound.currentTime = 0;
                    winSound.play().catch(() => {});
                }
            }
        });

        container.appendChild(button);
    }
}

function scoreBorde(containerId){
    const container = document.getElementById(containerId);
    
    container.innerHTML = "";

    const color = ["#00ffff", "#61716b", "#e1ac2ee8"];
    let text = [`X (YOU)<br> ${xcount}`, `TIES<br> ${tcount}`,`O (CPU)<br> ${ocount}`];
    for(let i = 0; i < 3; i++){
        const button = document.createElement("button");
        button.className = "grid-button2";
        button.style.backgroundColor = color[i];
        button.innerHTML = text[i];
        container.appendChild(button);
    }


}


function checkWinner(moves){
    for(let i = 0; i < winPattern.length; i++){
        let pattern = winPattern[i];
        let matchCount = 0;

        for(let j = 0; j < pattern.length; j++){
            if(moves.includes(pattern[j])){
                matchCount++;
            }
        }

        if(matchCount === 3){
            return pattern;
        }
    }
    return false;
}

function disabledAllButtons(){
    const allButtons = document.querySelectorAll(".grid-button");
    allButtons.forEach(btn => btn.disabled = true);
}

function highlightWinning(pattern){

    const buttons = document.querySelectorAll(".grid-button");
    
    for(let i = 0; i < buttons.length; i++){
        const button = buttons[i];
        const num = parseInt(button.dataset.num);

        for(let j = 0; j < pattern.length; j++){
            if(num === pattern[j]){
                button.classList.add("winning-button");

                setTimeout(() => {
                    button.classList.remove("winning-button");
                }, 1500);
            }
        }
    }
    setTimeout(() => {
        const popup = document.getElementById("win-popup");
        const message = document.getElementById("win-message");

        if(popup && message){
            const winner = count % 2 !== 0 ? playerMark : cpuMark;
            message.textContent = `🎉 Player : ${winner} Wins!`;
  
            if(winner === 'X'){
                xcount++;
                scoreBorde("grid-container2");
            }else if(winner === 'O'){
                ocount++;
                scoreBorde("grid-container2");
            }

            popup.classList.remove("hidden");
        }
        const winSound = document.getElementById("winAudio");
        if(winSound){
            winSound.pause();
            winSound.currentTime = 0;
            winSound.play().catch(() => {});
        }
    },1500);
}

function showPopup(text){
    const popup = document.getElementById("win-popup");
    const message = document.getElementById("win-message");

    if(popup && message){
        message.textContent = text;
        popup.classList.remove("hidden");
    }
}

function closePopup(){
    const popup = document.getElementById("win-popup");
    if(popup){
        popup.classList.add("hidden");
    }
}

// function to strat the game with CPU 
function startVsCPU(){
    const isVsCPU = localStorage.getItem("vsCPU") === "true";
    if(!isVsCPU){
        return ;
    }

    const firstTurn = playerMark === "O";
    if(firstTurn){
        cpuMark();
    }
}

// function for random move by CPU 
function makeCPUMove(){
    const availableButtons = Array.from(document.querySelectorAll(".grid-button")).filter(btn => btn.innerText === "");

    if(availableButtons.length === 0){
        return ;
    }

    const randomIndex = Math.floor(Math.random() * availableButtons.length);
    const button = availableButtons[randomIndex];

    setTimeout(() => button.click(),500);
}


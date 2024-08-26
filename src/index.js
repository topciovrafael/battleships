import Player from "./classes/player.js"
import './style.css';
let eu=new Player(1);
let bot=new Player(0);
let player1Board = eu.board;
let player2Board = bot.board;

let container = document.getElementById('harta');
    const numRows = 10;
    const numSquares = 10;
let butonStart=document.getElementById("start");

function harta(idHarta){
    container.innerHTML = '';
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('div');
        row.className = 'rand';

        for (let j = 0; j < numSquares; j++) {
            const square = document.createElement('div');
            square.className = idHarta;
            square.setAttribute('data-row', i);
            square.setAttribute('data-col', j);
            if (player1Board.isOccupied([i, j])) {
                square.style.backgroundColor = 'rgb(255, 196, 0)';
            }
            
            row.appendChild(square);
        }

        container.appendChild(row);
}
}

harta("patrat");
container = document.getElementById('harta-2');
harta("doipat");
container = document.getElementById('harta');


let celule=document.querySelectorAll('.patrat');
//let celule2=document.querySelectorAll('.doipat');


let butonFlip = document.getElementById("flip");
let flipApasat = 0;

let initialDimensions = {
    "doi-barca": { width: 0, height: 0 },
    "trei-barca": { width: 0, height: 0 },
    "patru-barca": { width: 0, height: 0 }
};

window.addEventListener('load', () => {
    let barciDeDoi = document.querySelector("#doi-barca");
    let barciDeTrei = document.querySelector("#trei-barca");
    let barciDePatru = document.querySelector("#patru-barca");

    if (barciDeDoi) {
        initialDimensions["doi-barca"].width = barciDeDoi.offsetWidth;
        initialDimensions["doi-barca"].height = barciDeDoi.offsetHeight;
    }
    if (barciDeTrei) {
        initialDimensions["trei-barca"].width = barciDeTrei.offsetWidth;
        initialDimensions["trei-barca"].height = barciDeTrei.offsetHeight;
    }
    if (barciDePatru) {
        initialDimensions["patru-barca"].width = barciDePatru.offsetWidth;
        initialDimensions["patru-barca"].height = barciDePatru.offsetHeight;
    }
});

butonFlip.addEventListener("click", () => {
    flipApasat++;

    let barciDeDoi = document.querySelectorAll("#doi-barca");
    let barciDeTrei = document.querySelectorAll("#trei-barca");
    let barciDePatru = document.querySelectorAll("#patru-barca");

    barciDeDoi.forEach(el => {
        if (flipApasat % 2 === 0) {
            el.style.height = `${initialDimensions["doi-barca"].height}px`;
            el.style.width = `${initialDimensions["doi-barca"].width}px`;
        } else {
            el.style.height = `${initialDimensions["doi-barca"].width}px`;
            el.style.width = `${initialDimensions["doi-barca"].height}px`;
        }
    });

    barciDeTrei.forEach(el => {
        if (flipApasat % 2 === 0) {
            el.style.height = `${initialDimensions["trei-barca"].height}px`;
            el.style.width = `${initialDimensions["trei-barca"].width}px`;
        } else {
            el.style.height = `${initialDimensions["trei-barca"].width}px`;
            el.style.width = `${initialDimensions["trei-barca"].height}px`;
        }
    });

    barciDePatru.forEach(el => {
        if (flipApasat % 2 === 0) {
            el.style.height = `${initialDimensions["patru-barca"].height}px`;
            el.style.width = `${initialDimensions["patru-barca"].width}px`;
        } else {
            el.style.height = `${initialDimensions["patru-barca"].width}px`;
            el.style.width = `${initialDimensions["patru-barca"].height}px`;
        }
    });
});

let barciAmplasate=0;

function enableAllClicks() {
    celule.forEach(celula => {
        if (celula.style.backgroundColor !== `rgb(255, 196, 0)`) {
            celula.style.pointerEvents = "auto";
        }
    });
}

function clearListeners() {
    celule.forEach(celula => {
        let newCell = celula.cloneNode(true);
        celula.parentNode.replaceChild(newCell, celula);
    });
    celule = document.querySelectorAll('.patrat');
}

let barci = document.querySelectorAll(".barca");

barci.forEach(barca=>{
    barca.addEventListener("click", ()=>{
        let barciDejaPuse=player1Board.ships.length;
        clearListeners();
        enableAllClicks();
        if (barca.id === 'unu-barca') {
            celule.forEach(celula => {
                celula.addEventListener("click",()=>{
                    let rand = parseInt(celula.getAttribute('data-row'));
                    let col = parseInt(celula.getAttribute('data-col'));
                    player1Board.amplasare([rand,col]);
                    if(barciDejaPuse<player1Board.ships.length){
                        barca.style.display = "none";
                    }  
                    harta("patrat");
                    console.log(player1Board.ships);
                })
            });
        }
        if (barca.id === 'doi-barca') {
            celule.forEach(celula => {
                celula.addEventListener("click",()=>{
                    let rand = parseInt(celula.getAttribute('data-row'));
                    let col = parseInt(celula.getAttribute('data-col'));
                    if(flipApasat===0||flipApasat%2==0){
                        player1Board.amplasare([rand,col],[rand,col+1]);
                    }
                    else{
                        player1Board.amplasare([rand+1,col],[rand,col]);
                    }
                    if(barciDejaPuse<player1Board.ships.length){
                        barca.style.display = "none";
                    } 
                    harta("patrat");
                })
            });
        }
        if (barca.id === 'trei-barca') {
            celule.forEach(celula => {
                celula.addEventListener("click",()=>{
                    let rand = parseInt(celula.getAttribute('data-row'));
                    let col = parseInt(celula.getAttribute('data-col'));
                    if(flipApasat===0||flipApasat%2==0){
                        player1Board.amplasare([rand,col],[rand,col+1],[rand,col+2]);
                    }
                    else{
                        player1Board.amplasare([rand+2,col],[rand+1,col],[rand,col]);
                    }
                    if(barciDejaPuse<player1Board.ships.length){
                        barca.style.display = "none";
                    } 
                    harta("patrat");
                })
            });
        }
        if (barca.id === 'patru-barca') {
            celule.forEach(celula => {
                celula.addEventListener("click",()=>{
                    let rand = parseInt(celula.getAttribute('data-row'));
                    let col = parseInt(celula.getAttribute('data-col'));
                    if(flipApasat===0||flipApasat%2==0){
                        player1Board.amplasare([rand,col],[rand,col+1],[rand,col+2],[rand,col+3]);
                    }
                    else{
                        player1Board.amplasare([rand+3,col],[rand+2,col],[rand+1,col],[rand,col]);
                    }
                    if(barciDejaPuse<player1Board.ships.length){
                        barca.style.display = "none";
                    } 
                    harta("patrat");
                })
            });
        }
        console.log(barciAmplasate);        
    });
})

document.getElementById("random").addEventListener("click", generareRandom);

function generareRandom(){
    player1Board.ships=[];
    barci.forEach(barca=>{
        barca.style.display='none';
    })
    eu.generareRandom();
    harta("patrat");
}

function reset(){
    player1Board.ships=[];
    barci.forEach(barca=>{
        barca.style.display='flex';
    })
    harta("patrat");
}

document.getElementById("reset").addEventListener("click", reset)

bot.generareRandom();

butonStart.addEventListener("click", startGame);

function startGame(){
    gameEnded=false;
    gameLogic();
    //alert("ATTACK!");
}

let tura=0;

function gameLogic(){
    if(player1Board.ships.length<10){
        alert("Place all your ships!");
        return;
    }
    else{
        document.getElementById("eitext").innerText="ATTACK!";
    }
    document.getElementById("reset").removeEventListener("click",reset);
    document.getElementById("random").removeEventListener("click", generareRandom);

        if(tura%2==0){
            playerTurn(tura);
        }
        
        tura++;
}

document.getElementById("restart").addEventListener("click", ()=>{
    location.reload();
});

let gameEnded=false;

function gameOver(){
    if(gameEnded) return;
    if(player1Board.shots.length===20||player2Board.shots.length===20){
        gameEnded=true;
        document.getElementById("popup").style.scale="1";
        document.getElementById("ceata").style.opacity="1";
        document.body.style.pointerEvents='none';
        document.getElementById("popup").style.pointerEvents='auto';
    }
    else return false;
}



function isAlreadyAttacked(row,col){
    let lovituri=player2Board.shots;
    let missedLovituri=player2Board.missedShots;
    return (lovituri.some(lovitura => lovitura[0] === row && lovitura[1] === col))||(missedLovituri.some(lovitura => lovitura[0] === row && lovitura[1] === col));
}

function dejaAtacatPlayer(row,col){
    let lovituri=player1Board.shots;
    let missedLovituri=player1Board.missedShots;
    return (lovituri.some(lovitura => lovitura[0] === row && lovitura[1] === col))||(missedLovituri.some(lovitura => lovitura[0] === row && lovitura[1] === col));
}

function alreadySunk(){
    let iter=0;
    player2Board.ships.forEach(ship=>{
        if(ship.hit===ship.length){
            iter++;
        }
    })
    return iter;
}

function alreadySunkBot(){
    let iter=0;
    player1Board.ships.forEach(ship=>{
        if(ship.hit===ship.length){
            iter++;
        }
    })
    return iter;
}

function enableOpponentCells() {
    let oppCells = document.querySelectorAll(".doipat");
    oppCells.forEach(cell => {
        cell.style.pointerEvents = "auto";  // Re-enable pointer events for player's turn
    });
}

function playerTurn(){
    enableOpponentCells();
    /* player1Board.ships.forEach(ship=>{
        if(ship.sunk===1){
            alert("sunk");
        }
    });
    player2Board.ships.forEach(ship=>{
        if(ship.sunk===1){
            alert("sunk");
        }
    }); */
    //gameOver();
    let dejasunk=alreadySunk();
    //console.log(dejasunk);
    let oppCells=document.querySelectorAll(".doipat");

    if(!gameOver()){
        oppCells.forEach(cell=>{
            cell.addEventListener("click",()=>{

                    let row = parseInt(cell.getAttribute('data-row'), 10);
                    let col = parseInt(cell.getAttribute('data-col'), 10);
                    let ratate=player2Board.missedShots.length;
                    let nimerite=player2Board.shots.length; 
                if(!isAlreadyAttacked(row,col)){
                    player2Board.receiveAttack([row,col]);

                    if(ratate<player2Board.missedShots.length){
                    let span=document.createElement("div");
                    document.getElementById("eitext").innerText="";
                    span.classList.add("dot");
                    cell.appendChild(span);
                    }

                    if(nimerite<player2Board.shots.length){
                    let span=document.createElement("div");
                    span.classList.add("dot");
                    span.setAttribute("id", "nimerit");
                    document.getElementById("eitext").innerText="";
                    cell.appendChild(span);
                    let loviteNou=0;
                    player2Board.ships.forEach(ship=>{
                        if(ship.hit===ship.length){
                            loviteNou++;
                        }
                        
                    });
                    if(loviteNou>dejasunk){
                        setTimeout(()=>{//alert("You destroyed a ship!");
                        document.getElementById("eitext").innerText="You destroyed a ship!";
                        dejasunk=loviteNou;},100);
                    }
                    playerTurn();  // Call playerTurn again for another shot
                        return;  
                    //playerTurn();
                    let i=0;
                    /* player2Board.ships.forEach(ship=>{
                        if(ship.hit===ship.length){
                            i++;
                        }
                    })
                    if(i>dejasunk){
                        alert("Sunk!");
                    } */
                    }
                    /* if(!gameOver()){
                        setTimeout(botTurn(),1000);
                    } */
                    //gameOver();
                    botTurn();
                }        
            
             
            });

        
    }); 
    }

}

let gasitLovit=null;

function botTurn(){
    //gameOver();
    let dejasunk=alreadySunkBot();
    let oppCells=document.querySelectorAll(".doipat");
    oppCells.forEach(cell=>{
        cell.style.pointerEvents='none';
    })
    setTimeout(()=>{
        let row,col;
        do{
            row=Math.floor(Math.random()*10);
            col=Math.floor(Math.random()*10);
        }while(dejaAtacatPlayer(row,col));
        let ratate=player1Board.missedShots.length;
        let nimerite=player1Board.shots.length;
        let playerCells = document.querySelectorAll(".patrat");
            let attackedCell = Array.from(playerCells).find(cell => {
                return (
                    parseInt(cell.getAttribute('data-row')) === row &&
                    parseInt(cell.getAttribute('data-col')) === col
                );
            });
        if(!dejaAtacatPlayer(row,col)){
            player1Board.receiveAttack([row,col]);
            if(ratate<player1Board.missedShots.length){
            let span=document.createElement("div");
            document.getElementById("noitext").innerText="";
            span.classList.add("dot");
            attackedCell.appendChild(span);
            }
        
        if(nimerite<player1Board.shots.length){

        let span=document.createElement("div");
        span.classList.add("dot");
        span.setAttribute("id", "nimerit");
        document.getElementById("noitext").innerText="";
        attackedCell.appendChild(span);
        let loviteNou=0;
                    player1Board.ships.forEach(ship=>{
                        if(ship.hit===ship.length){
                            loviteNou++;
                        }
                        
                    });
                    if(loviteNou>dejasunk){
                        setTimeout(()=>{//alert("You destroyed a ship!");
                        document.getElementById("noitext").innerText="Your ship got destroyed!";
                        dejasunk=loviteNou;},100);
                    }
        //promise here
        return new Promise(() => {
            botTurn();  // Recursive botTurn call // Resolve after the recursive call
        }).then(() => {
            console.log("Recursive bot turn completed.");
            enableOpponentCells();  // Enable player's turn after bot finishes
        });

         }
        }
        gameOver();
        enableOpponentCells();
    },1000);
    /* oppCells.forEach(cell=>{
        cell.style.pointerEvents='all';
    }) */
}





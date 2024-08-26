import Gameboard from "./gameboard.js";

export default class Player{
    constructor(realPlayer){
        this.realPlayer=realPlayer;
        this.board=new Gameboard();
    }
    generareRandom(){
        while(this.board.ships.length<4){
            this.board.amplasare([Math.floor(Math.random()*10),Math.floor(Math.random()*10)]);
        }
        while(this.board.ships.length<7){
            let intors=Math.round(Math.random());
            let x=Math.floor(Math.random()*10);
            let y=Math.floor(Math.random()*10);
            if(!intors){
                this.board.amplasare([x,y],[x,y+1]);
            }
            else{
                this.board.amplasare([x+1,y],[x,y]);
            }
        }
        while(this.board.ships.length<9){
            let intors=Math.round(Math.random());
            let x=Math.floor(Math.random()*10);
            let y=Math.floor(Math.random()*10);
            if(!intors){
                this.board.amplasare([x,y],[x,y+1],[x,y+2]);
            }
            else{
                this.board.amplasare([x+2,y],[x+1,y],[x,y]);
            }
        }
        while(this.board.ships.length<10){
            let intors=Math.round(Math.random());
            let x=Math.floor(Math.random()*10);
            let y=Math.floor(Math.random()*10);
            if(!intors){
                this.board.amplasare([x,y],[x,y+1],[x,y+2],[x,y+3]);
            }
            else{
                this.board.amplasare([x+3,y],[x+2,y],[x+1,y],[x,y]);
            }
        }
    }
}
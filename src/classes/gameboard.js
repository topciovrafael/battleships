import Ship from "./ship.js";

export default class Gameboard{
    constructor(){
        this.length=10;
        this.width=10;
        this.ships=[];
        this.shots=[];
        this.missedShots=[];
        this.harta = Array.from({ length: this.length }, () => Array(this.width).fill(0));
    }

    areWithinBounds(coordinates){
        let variabila=0;
        for(let cord of coordinates){
            if(cord[0]>9||cord[0]<0||cord[1]>9||cord[1]<0)
            variabila++;
        }
        if(variabila===0){
            return true;
        }
        else return false;
    }


    isOccupied(coordinate) {
        for (let ship of this.ships) {
            for (let shipCord of ship.coordinates) {
                if (coordinate[0] === shipCord[0] && coordinate[1] === shipCord[1]) {
                    return true; // Coordinate is occupied
                }
            }
        }
        return false; // Coordinate is not occupied
    }

    amplasare(...coordinates){
        let areAllCoordinatesWithinBounds = coordinates.every(coordinate => this.areWithinBounds([coordinate]));
    let areAllCoordinatesFree = coordinates.every(coordinate => !this.isOccupied(coordinate));

    if (areAllCoordinatesWithinBounds && areAllCoordinatesFree) {
        const newShip = new Ship(coordinates.length, coordinates); // Create a new ship instance
        this.ships.push(newShip);
    }
    }

    receiveAttack(coordonateSingular){
        for(let shot of this.shots){
            if(shot[0] === coordonateSingular[0] && shot[1] === coordonateSingular[1]) return 0;
        }
        for(let shot of this.missedShots){
            if(shot[0] === coordonateSingular[0] && shot[1] === coordonateSingular[1]) return 0;
        }
        let hit=false;
        for(let ship of this.ships){
            for(let shipCord of ship.coordinates){
/*                 console.log(shipCord[0]+" "+ coordonateSingular[0]);
                console.log(shipCord[1]+" "+ coordonateSingular[1]); */
                if(shipCord[0] === coordonateSingular[0] && shipCord[1] === coordonateSingular[1]){
                    ship.hitFn();
                    hit =true;
                    this.shots.push(coordonateSingular);
                    if(ship.length==ship.hit){
                        ship.sunk=1;
                    }
                }
            }
            if(hit) break;
        }
        if(!hit) this.missedShots.push(coordonateSingular);
    }
}

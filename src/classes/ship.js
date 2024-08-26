class Ship{
    constructor(length,coordinates,sunk=0,hit=0,yAxis=false){
        this.length=length;
        this.coordinates=coordinates;
        this.sunk=sunk;
        this.hit=hit;
        this.yAxis=yAxis;
    }
    hitFn(){
        this.hit++;
        return this.hit;
    }
    isSunk(){
        if(this.hit===this.length){
            alert("Ship is sunk!");
            return true;
        }
        else return false;
    }
}

export default Ship;
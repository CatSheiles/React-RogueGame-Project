class Player {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    //move delta x & delta y when move is called to move player
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    draw(context) {
        context.fillStyle = '#f00';
        context.textBaseline = 'hanging';
        context.font = '16px Helvetica';
        context.fillText('@', this.x * this.size, this.y * this.size);
    }

    copyPlayer(){
        let newPlayer = new Player();
        Object.assign(newPlayer, this);
        return newPlayer;
    }
}

export default Player;
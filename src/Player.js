import Entity from './Entity.js';

class Player extends Entity {
    inventory = []; //create an inventory so that loot items can be added

    attributes = {
        name: 'Player',
        ascii: '🤴',
        health: 10
    }
    //move delta x & delta y when move is called to move player
    move(dx, dy) {
        if (this.attributes.health <= 0) return;
        this.x += dx;
        this.y += dy;
    }

    add(item){ //when player bumps into loot add item to inventory
        this.inventory.push(item);
    }

    copyPlayer(){
        let newPlayer = new Player();
        Object.assign(newPlayer, this);
        return newPlayer;
    }
}

export default Player;
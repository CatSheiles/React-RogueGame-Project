import Loot from './Loot.js';
import Monster from './Monster.js';
import Stairs from './Stairs.js'; 

//the offset's in loot n monsters are just because!! 
//just use- for asthetics makes it look like everything sits in the right space
const lootTable = [
    {
        name: 'Long Sword', 
        color: 'lightgray', 
        ascii: '🗡', 
        offset: {x: 6,y:3}
    },
    {
        name: 'Health Potion', 
        color: 'red', 
        ascii: '🌭', 
        offset: {x: 6,y:3}
    },
    {
        name: 'Gold coin', 
        color: '#FFD700', 
        ascii: '💰', 
        offset: {x: 3,y:3}
    },
    {
        name: 'Light Armour', 
        color: 'green', 
        ascii: '🚚', 
        offset: {x: 4,y:3}
    }
];

const monsterTable = [
    {
        name: 'Ogre', 
        color: 'purple', 
        ascii: '👹', 
        offset: {x: 2,y:3},
        health: 4
    },
    {
        name: 'Wookie', 
        color: 'brown', 
        ascii: '🐱‍👤', 
        offset: {x: 4,y:3}, 
        health: 8
    },
    {
        name: 'Slime', 
        color: 'limegreen', 
        ascii: '🤑', 
        offset: {x: 3,y:2}, 
        health: 2
    },
    {
        name: 'Dragon', 
        color: 'red', 
        ascii: '🐲', 
        offset: {x: 2,y:3}, 
        health: 5
    }
];

class Spawner {
    constructor(world) {
        this.world = world;
    }
    spawn(spawnCount, createEntity) {
        for (let count = 0; count < spawnCount; count++) {
            let entity = createEntity();
            this.world.add(entity);
            this.world.moveToSpace(entity);
        }
    }

    spawnLoot(spawnCount) {
        this.spawn(spawnCount, () => {
            return new Loot (
                getRandomInt(this.world.width - 1), 
                getRandomInt(this.world.height - 1), 
                this.world.tilesize,
                lootTable[getRandomInt(lootTable.length)]
            );
        });
    }

    spawnMonsters(spawnCount) {
        this.spawn(spawnCount, () => {
            return new Monster (
                getRandomInt(this.world.width - 1), 
                getRandomInt(this.world.height - 1), 
                this.world.tilesize,
                monsterTable[getRandomInt(monsterTable.length)]
            );
        });
    }
    spawnStairs() {
        let stairs = new Stairs(
            this.world.width - 10,
            this.world.height - 10, 
            this.world.tilesize);
        this.world.add(stairs);
        this.world.moveToSpace(stairs);
    }
}

function  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
    
}
export default Spawner;
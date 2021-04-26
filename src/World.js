//need to do an npn install for rot-js library - rot is a cool random generated rogue dungeon library
import { Map } from 'rot-js'; //rot-js magic library
import Player from './Player';

class World {
    constructor(width, height, tilesize) {
        this.width = width;
        this.height = height;
        this.tilesize = tilesize;
        this.entities = [new Player(0, 0, 16)]; //everything inside the world is going to be an 'entity' so setting entity here
        this.history = ['You enter the Dungeon', '---'];

        //after width,height,tilesize constructor, creating 2D array
        this.worldmap = new Array(this.width);
        for (let x = 0; x < this.width; x++) {
            this.worldmap[x] = new Array(this.height);
        }
    }

    get player(){
        return this.entities[0];
    }

    add(entity) {
        this.entities.push(entity);
    }

    remove(entity) { //super cool magic array called filter which filters loot out
        this.entities = this.entities.filter(e => e!== entity);
    }

    //make sure player or any entity starts in a blank space - oh the math!
    moveToSpace(entity){
        for (let x = entity.x; x < this.width; x++) {
            for (let y = entity.y; y < this.height; y++) {
               if(this.worldmap[x][y] === 0 && !this.getEntityAtLocation(x, y)) {
                   entity.x = x ;
                   entity.y = y;
                   return;
               }
            }
        }
    }

    isWall(x, y) { //if play hits a wall or goes off map
        return (
            this.worldmap[x] === undefined || 
            this.worldmap[y] === undefined || 
            this.worldmap[x][y] === 1
        );
    }

    getEntityAtLocation(x, y){
        return this.entities.find(entity => entity.x === x && entity.y === y);
    }

    movePlayer(dx, dy){
        let tempPlayer = this.player.copyPlayer(); //when moving player check for walls
        tempPlayer.move(dx, dy);

        //see if player has bumped into any loot!
        let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);
        if(entity) {
            console.log(entity);
            entity.action('bump', this);
            return;
        }

        if(this.isWall(tempPlayer.x, tempPlayer.y)){
            console.log(`Way blocked at ${tempPlayer.x}:${tempPlayer.y}!`);
        } else {
            this.player.move(dx, dy);
        }            
    }

    createCellularMap(){ //cellular map is a part of rot library
        var map = new Map.Cellular(this.width, this.height, { connected: true });
        map.randomize(0.5);
        var userCallback = (x, y, value) => {
            if (x === 0 || y === 0 || x === this.width -1 || y === this.height -1){
                this.worldmap[x][y] = 1; //Create walls around edges of map
                return;
            }
            this.worldmap[x][y] = (value === 0) ? 1 : 0; //if value===0 assign 1 otherwise assign 0
        };
        map.create(userCallback);
        map.connect(userCallback, 1); //remember 0 is a wall so 1 is an empty space so passing in 1 here
    }
    
    draw(context) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.worldmap[x][y] === 1) this.drawWall(context, x, y);
            }
        }
        this.entities.forEach(entity => {
            entity.draw(context);
        });
    }

    drawWall(context, x, y) {
        context.fillStyle = '#000';
        context.fillRect(
            x * this.tilesize, 
            y * this.tilesize, 
            this.tilesize, 
            this.tilesize
        );
    }

    addToHistory(history) {
        this.history.push(history);
        //cut the history lines down - instead of just keeping all history just keep a few lines
        if (this.history.length > 6) this.history.shift();
    }
}
export default World;
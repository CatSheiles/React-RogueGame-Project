import Entity from './Entity.js';

class Loot extends Entity {
    action(verb, world) {
        if(verb === 'bump') {
            world.player.add(this); //add the loot player bumps into
            world.remove(this); //player collected loot so remove it from the world
        }
        if(verb, 'drop') {
            console.log('drop', this);
        }
    }
}

export default Loot;
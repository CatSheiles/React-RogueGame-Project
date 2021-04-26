
import Action from 'rot-js/lib/scheduler/action';
import Entity from './Entity.js';
import Spawner from './Spawner.js';

class Stairs extends Entity {
    attributes = {
        name: 'Stairs', 
        color: 'yellow', 
        ascii: '⤵', 
        offset: {x:2,y:2}
    };

    action(verb, world) {
        if(verb === 'bump'){
            world.addToHistory('You moved DOWN stairs...fabulous!!');
            //so now player goes down stairs so need to create new cellular map
            //then move player outside of any wall
            //recreate entities - loot, monsters, spawners etc
            world.createCellularMap();
            world.player.x = 0;
            world.player.y = 0;
            world.moveToSpace(world.player);
            world.entities = world.entities.filter(e => e === world.player);
            let spawner = new Spawner(world);
            spawner.spawnLoot(10);
            spawner.spawnMonsters(18);
            spawner.spawnStairs();
        }
    }
}
export default Stairs;

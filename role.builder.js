var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        function build(target) {
            if(creep.memory.building) {
                if(target.length) {
                    // console.log(JSON.stringify(targets[0]));
                    if(creep.build(target[0]) == ERR_NOT_IN_RANGE) {
                        // console.log(targets[0]);
                        creep.moveTo(target[0]);
                    }
                }
            }
            else {
                const sources = creep.room.find(FIND_SOURCES);
               // const sources = creep.pos.findNearest(Game.SOURCES);
               //const source = creep.pos.findClosestByRange(FIND_SOURCES);
               // const source  = 'source #c9e7c224cf869193c232a946';
               // let source;
               // if (creep.memory.source === 3) {
               //     source = sources[3];
               // }
               // else {
               //     source = sources;
               // }
               // const source = '[source #c739d6af552b367152de461b]';
               // console.log(sources);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        let targets = [];
        if (Game.flags.build) {
            for (let site in creep.room.find(FIND_CONSTRUCTION_SITES)) {
                // console.log(JSON.stringify(site));
                if (site.pos === Game.flags.build.pos) {
                    targets.push(site);
                }
            }
            // targets.push(Game.flags.build);
        }
        else {
            targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        }
        build(targets);
    }
};

module.exports = roleBuilder;

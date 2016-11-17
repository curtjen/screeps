module.exports = {
    clearCreepMemory: () => {
        // clear memory
        for (let name in Memory.creeps) {
            if (Game.creeps[name] === undefined) {
                delete Memory.creeps[name];
            }
        }
    },
    makeCreep: (role, level, custom) => {
        let roleStack = [];
        switch (role) {
            case 'harvester':
                roleStack = [WORK,WORK,CARRY,MOVE];
                break;
            case 'upgrader':
                roleStack = [WORK,CARRY,MOVE,MOVE];
                break;
            case 'builder':
                roleStack = [WORK,WORK,CARRY,MOVE];
                break;
            case 'custom':
                roleStack = custom;
            default:
                roleStack = [WORK,WORK,CARRY,MOVE];
                break;
        }

        let creepName = Game.spawns.Spawn1.createCreep(roleStack, undefined,
            {
                role: role,
                working: false
            });
        if (isNaN(creepName)) {
            console.log('New creep created: ' + creepName);
        }
    },
    phase1: () => {
        Memory.phaseSettings = {
            minHarvesters: 2,
            minBuilders: 0,
            minUpgraders: 1
        };
        console.log("Entered Phase1");
    }
};

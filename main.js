// import modules
var roleHarvester = require('role.harvester');
var roleUpgrader  = require('role.upgrader');
var roleBuilder   = require('role.builder');


module.exports.loop = function () {
    // globalize CLI commands
    Game.CLI = require('cli.commands');

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            // roleBuilder.run(creep);
        }
        else if (creep.memory.role === 'builder') {
            roleBuilder.run(creep);
            // roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
        // if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
            // roleBuilder.run(creep);
        }
        else {
            roleBuilder.run(creep);
        }
    }

    if (Memory.phaseSettings) {
        const minBuilders   = Memory.phaseSettings.minBuilders;
        const minHarvesters = Memory.phaseSettings.minHarvesters;
        const minUpgraders  = Memory.phaseSettings.minUpgraders;


        const numBuilders   = _.sum(Game.creeps, (c) => c.memory.role === 'builder');
        const numHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester');
        const numUpgraders  = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader');
        const superBuilder  = _.sum(Game.creeps, (c) => c.memory.role === 'superBuilder');
        let name = undefined;
        if (numHarvesters < minHarvesters) {
            Game.CLI.clearCreepMemory();
            Game.CLI.makeCreep('harvester');
        }
        // else if (superBuilder < 1) {
        //     Game.CLI.clearCreepMemory();
        //     Game.CLI.makeCreep('custom', [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE]);
        // }
        else if (numBuilders < minBuilders) {
            Game.CLI.clearCreepMemory();
            Game.CLI.makeCreep('builder');
        }
        else if (numUpgraders < minUpgraders) {
            Game.CLI.clearCreepMemory();
            Game.CLI.makeCreep('upgrader');
        }
    }
    else {
        Game.CLI.phase1();
    }
};

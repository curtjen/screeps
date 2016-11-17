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


        let numBuilders, numHarvesters, numUpgraders;
        let name = undefined;

        // Check amount of creeps ever X amount of ticks
        if (Game.time % 20 === 0) {
            Memory.counts = {
                numBuilders:   _.sum(Game.creeps, (c) => c.memory.role === 'builder'),
                numHarvesters: _.sum(Game.creeps, (c) => c.memory.role === 'harvester'),
                numUpgraders:  _.sum(Game.creeps, (c) => c.memory.role === 'upgrader')
            }
        }
        else {
            numBuilders   = Memory.counts.numBuilders;
            numHarvesters = Memory.counts.numHarvesters;
            numUpgraders  = Memory.counts.numUpgraders;
        }

        // Make new creeps if lower than minimums
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

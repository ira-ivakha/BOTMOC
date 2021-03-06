'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "ip" from table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "removedIp",
    "created": "2018-11-13T19:59:52.158Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["Users", "ip"]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

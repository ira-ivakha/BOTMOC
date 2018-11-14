'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "Vists", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "removedIpVist",
    "created": "2018-11-14T22:14:20.463Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "locationData": {
                    "type": Sequelize.JSON
                },
                "userAgent": {
                    "type": Sequelize.STRING
                },
                "acceptLanguage": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Vists",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "ip": {
                    "type": Sequelize.STRING
                },
                "userAgent": {
                    "type": Sequelize.STRING
                },
                "acceptLanguage": {
                    "type": Sequelize.STRING
                },
                "locationData": {
                    "type": Sequelize.JSON
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

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

const database = require("../database");

class Organization {
    constructor() {
        this.model = database.db.define("organizations", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: database.db.Sequelize.STRING,
                allowNull: true
            },
            phone: {
                type: database.db.Sequelize.STRING,
                allowNull: true
            },
            email: {
                type: database.db.Sequelize.STRING,
                allowNull: true
            }
        })
    }
}

module.exports = new Organization().model;

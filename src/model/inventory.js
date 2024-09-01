const database = require("../database");
const Organization = require("./organization");

class Inventory {
    constructor() {
        this.model = database.db.define("inventories", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            location: {
                type: database.db.Sequelize.STRING,
                allowNull: true
            },
            organizationId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: Organization,
                    key: 'id'
                }
            }
        });

        this.model.belongsTo(Organization, {
            foreignKey: 'organizationId'
        });
        Organization.hasMany(this.model, {
            foreignKey: 'organizationId'
        });
    }
}

module.exports = new Inventory().model;

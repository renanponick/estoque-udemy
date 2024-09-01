const database = require("../database");
const User = require("./user");
const Inventory = require("./inventory");
const Product = require("./product");

class InventoryMovement {
    constructor() {
        this.model = database.db.define("inventory_movements", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: User,
                    key: 'id'
                }
            },
            inventoryId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: Inventory,
                    key: 'id'
                }
            },
            productId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: Product,
                    key: 'id'
                }
            },
            quantity: {
                type: database.db.Sequelize.INTEGER,
                allowNull: false
            },
            type: {
                type: database.db.Sequelize.ENUM("in", "out"),
                allowNull: false
            },
            date: {
                type: database.db.Sequelize.DATE,
                defaultValue: database.db.Sequelize.NOW
            }
        });

        this.model.belongsTo(User, {
            foreignKey: 'userId'
        });
        this.model.belongsTo(Inventory, {
            foreignKey: 'inventoryId'
        });
        this.model.belongsTo(Product, {
            foreignKey: 'productId'
        });

        User.hasMany(this.model, {
            foreignKey: 'userId'
        });
        Inventory.hasMany(this.model, {
            foreignKey: 'inventoryId'
        });
        Product.hasMany(this.model, {
            foreignKey: 'productId'
        });
    }
}

module.exports = new InventoryMovement().model;

const getProductsFromInventory = require("../fns/resume-movements");
const inventory = require("../model/inventory");
const inventoryMovement = require("./inventoryMovement");

class ServiceInventory {
    async FindAll(organizationId, transaction) {
        return inventory.findAll({ where: { organizationId }, transaction });
    }

    async FindById(organizationId, id, transaction) {
        const inventoryInfo = await inventory.findOne({ where: { organizationId, id }, transaction });
        const inventoryMovements = await inventoryMovement.FindAll(id)

        const resume = getProductsFromInventory(inventoryMovements)

        return { ...inventoryInfo.dataValues, ...resume } 
    }

    async Create(name, organizationId, transaction) {
        if (!name) {
            throw new Error("Please provide inventory name");
        }

        return inventory.create({ name, organizationId }, { transaction });
    }

    async Update(organizationId, id, name, transaction) {
        const existingInventory = await this.FindById(organizationId, id, transaction);

        existingInventory.name = name || existingInventory.name;

        await existingInventory.save({ transaction });

        return existingInventory;
    }

    async Delete(organizationId, id, transaction) {
        const existingInventory = await this.FindById(organizationId, id, transaction);
        if(!existingInventory) {
            throw new Error("Favor informar o estoque corretamente")
        }
        await existingInventory.destroy({ transaction });
        return true;
    }
}

module.exports = new ServiceInventory();

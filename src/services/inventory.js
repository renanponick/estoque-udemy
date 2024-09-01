const inventory = require("../model/inventory");

class ServiceInventory {
    async FindAll(transaction) {
        return inventory.findAll({ transaction });
    }

    async FindById(id, transaction) {
        return inventory.findByPk(id, { transaction });
    }

    async Create(name, organizationId, transaction) {
        if (!name) {
            throw new Error("Please provide inventory name");
        }

        return inventory.create({ name, organizationId }, { transaction });
    }

    async Update(id, name, transaction) {
        const existingInventory = await this.FindById(id, transaction);

        existingInventory.name = name || existingInventory.name;

        await existingInventory.save({ transaction });

        return existingInventory;
    }

    async Delete(id, transaction) {
        const existingInventory = await this.FindById(id, transaction);
        await existingInventory.destroy({ transaction });
        return true;
    }
}

module.exports = new ServiceInventory();

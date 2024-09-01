const inventoryMovement = require("../model/inventoryMovement");

class ServiceInventoryMovement {
    async FindAll(transaction) {
        return inventoryMovement.findAll({ transaction });
    }

    async FindById(id, transaction) {
        return inventoryMovement.findByPk(id, { transaction });
    }

    async Create(type, quantity, inventoryId, productId, userId, transaction) {
        if (!type || !quantity || !inventoryId || !productId || !userId) {
            throw new Error("Please provide all required fields");
        }

        return inventoryMovement.create({ type, quantity, inventoryId, productId, userId }, { transaction });
    }

    async Update(id, type, quantity, transaction) {
        const existingMovement = await this.FindById(id, transaction);

        existingMovement.type = type || existingMovement.type;
        existingMovement.quantity = quantity || existingMovement.quantity;

        await existingMovement.save({ transaction });

        return existingMovement;
    }

    async Delete(id, transaction) {
        const existingMovement = await this.FindById(id, transaction);
        await existingMovement.destroy({ transaction });
        return true;
    }
}

module.exports = new ServiceInventoryMovement();

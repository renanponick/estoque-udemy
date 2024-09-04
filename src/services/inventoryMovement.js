const inventoryMovement = require("../model/inventoryMovement");
const product = require("../model/product");

const types = ['out', 'in']

class ServiceInventoryMovement {
    async FindAll(inventoryId, transaction) {
        return inventoryMovement.findAll({ where: { inventoryId }, include: { model: product }, transaction });
    }

    async FindById(inventoryId, id, transaction) {
        return inventoryMovement.findOne({ where: { inventoryId, id }, transaction });
    }

    async Create(inventoryId, userId, productId, type, quantity, transaction) {
        if (!type || !quantity || !productId || !types.includes(type)) {
            throw new Error("Favor enviar todos os dados corretamente");
        }

        return inventoryMovement.create({ type, quantity, inventoryId, productId, userId }, { transaction });
    }

    async Update(inventoryId, id, type, quantity, transaction) {
        const existingMovement = await this.FindById(inventoryId, id, transaction);

        if (type && !types.includes(type)) {
            throw new Error("Favor enviar todos os dados corretamente");
        }

        existingMovement.type = type || existingMovement.type;
        existingMovement.quantity = quantity || existingMovement.quantity;

        await existingMovement.save({ transaction });

        return existingMovement;
    }

    async Delete(inventoryId, id, transaction) {
        const existingMovement = await this.FindById(inventoryId, id, transaction);
        await existingMovement.destroy({ transaction });
        return true;
    }
}

module.exports = new ServiceInventoryMovement();

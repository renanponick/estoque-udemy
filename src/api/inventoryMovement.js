const serviceInventoryMovement = require("../services/inventoryMovement");

class ApiInventoryMovement {
    async FindAll(_, res) {
        try {
            const result = await serviceInventoryMovement.FindAll();
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async FindById(req, res) {
        try {
            const { id } = req.params;
            const result = await serviceInventoryMovement.FindById(id);
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Create(req, res) {
        try {
            const { userId, inventoryId, productId, quantity, type } = req.body;
            await serviceInventoryMovement.Create(userId, inventoryId, productId, quantity, type);
            res.status(201).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params;
            const { userId, inventoryId, productId, quantity, type } = req.body;
            const result = await serviceInventoryMovement.Update(id, userId, inventoryId, productId, quantity, type);
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Delete(req, res) {
        try {
            const { id } = req.params;
            await serviceInventoryMovement.Delete(id);
            res.status(204).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }
}

module.exports = new ApiInventoryMovement();

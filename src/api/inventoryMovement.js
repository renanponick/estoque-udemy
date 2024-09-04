const serviceInventoryMovement = require("../services/inventoryMovement");

class ApiInventoryMovement {
    async FindAllByInventory(req, res) {
        try {
            const { inventoryId } = req.params
            const inventoryMovement = await serviceInventoryMovement.FindAll(inventoryId);
            res.status(200).send({ inventoryMovement });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async FindById(req, res) {
        try {
            const { inventoryId, id } = req.params;
            const inventoryMovement = await serviceInventoryMovement.FindById(inventoryId, id);
            if(!inventoryMovement) {
                return res.status(404).send();
            }
            res.status(200).send({ inventoryMovement });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Create(req, res) {
        try {
            const { inventoryId } = req.params;
            const userId = req.session.id
            const { productId, quantity, type } = req.body;

            await serviceInventoryMovement.Create(inventoryId, userId, productId, type, quantity);
            res.status(201).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Update(req, res) {
        try {
            const { id, inventoryId } = req.params;
            const { quantity, type } = req.body;

            const inventoryMovement = await serviceInventoryMovement.Update(inventoryId, id, type, quantity);
            res.status(200).send({ inventoryMovement });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Delete(req, res) {
        try {
            const { inventoryId, id } = req.params;
            await serviceInventoryMovement.Delete(inventoryId, id);
            res.status(204).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }
}

module.exports = new ApiInventoryMovement();

const serviceInventory = require("../services/inventory");

class ApiInventory {
    async FindAll(_, res) {
        try {
            const result = await serviceInventory.FindAll();
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async FindById(req, res) {
        try {
            const { id } = req.params;
            const result = await serviceInventory.FindById(id);
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Create(req, res) {
        try {
            const { name, location, organizationId } = req.body;
            await serviceInventory.Create(name, location, organizationId);
            res.status(201).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params;
            const { name, location, organizationId } = req.body;
            const result = await serviceInventory.Update(id, name, location, organizationId);
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Delete(req, res) {
        try {
            const { id } = req.params;
            await serviceInventory.Delete(id);
            res.status(204).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }
}

module.exports = new ApiInventory();

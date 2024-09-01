const serviceOrganization = require("../services/organization");

class ApiOrganization {
    async FindAll(_, res) {
        try {
            const result = await serviceOrganization.FindAll();
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async FindById(req, res) {
        try {
            const { id } = req.params;
            const result = await serviceOrganization.FindById(id);
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Create(req, res) {
        try {
            const { name, address, phone, email } = req.body;
            await serviceOrganization.Create(name, address, phone, email);
            res.status(201).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params;
            const { name, address, phone, email } = req.body;
            const result = await serviceOrganization.Update(id, name, address, phone, email);
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Delete(req, res) {
        try {
            const { id } = req.params;
            await serviceOrganization.Delete(id);
            res.status(204).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }
}

module.exports = new ApiOrganization();

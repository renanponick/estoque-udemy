const serviceOrganization = require("../services/organization");

class ApiOrganization {
    async FindById(req, res) {
        try {
            const organization = await serviceOrganization.FindById(req.session.organizationId);
            res.status(200).send({ organization });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Create(req, res) {
        try {
            const { name, address, phone, email } = req.body;
            const infos = await serviceOrganization.Create(name, address, phone, email);
            res.status(201).send({ infos });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Update(req, res) {
        try {
            const id = req.session.organizationId;
            const { name, address, phone, email } = req.body;
            const result = await serviceOrganization.Update(id, name, address, phone, email);
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Delete(req, res) {
        try {
            const id = req.session.organizationId;
            await serviceOrganization.Delete(id);
            res.status(204).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }
}

module.exports = new ApiOrganization();

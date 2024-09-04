const serviceProduct = require("../services/product");

class ApiProduct {
    async FindAll(req, res) {
        try {
            const organizationId = req.session.organizationId
            const products = await serviceProduct.FindAll(organizationId);
            res.status(200).send({ products });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async FindById(req, res) {
        try {
            const organizationId = req.session.organizationId
            const { id } = req.params;
            const product = await serviceProduct.FindById(organizationId, id);
            if(!product) {
                return res.status(404).send();
            }

            res.status(200).send({ product });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Create(req, res) {
        try {
            const organizationId = req.session.organizationId
            const { name, description } = req.body;
            await serviceProduct.Create(name, description, organizationId);
            res.status(201).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Update(req, res) {
        try {
            const organizationId = req.session.organizationId
            const { id } = req.params;
            const { name, description } = req.body;
            const product = await serviceProduct.Update(organizationId, id, name, description);
            res.status(200).send({ product });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Delete(req, res) {
        try {
            const organizationId = req.session.organizationId
            const { id } = req.params;
            await serviceProduct.Delete(organizationId, id);
            res.status(204).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }
}

module.exports = new ApiProduct();

const serviceProduct = require("../services/product");

class ApiProduct {
    async FindAll(_, res) {
        try {
            const result = await serviceProduct.FindAll();
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async FindById(req, res) {
        try {
            const { id } = req.params;
            const result = await serviceProduct.FindById(id);
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Create(req, res) {
        try {
            const { name, description, barcode, unitOfMeasure, organizationId } = req.body;
            await serviceProduct.Create(name, description, barcode, unitOfMeasure, organizationId);
            res.status(201).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Update(req, res) {
        try {
            const { id } = req.params;
            const { name, description, barcode, unitOfMeasure, organizationId } = req.body;
            const result = await serviceProduct.Update(id, name, description, barcode, unitOfMeasure, organizationId);
            res.status(200).send({ result });
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }

    async Delete(req, res) {
        try {
            const { id } = req.params;
            await serviceProduct.Delete(id);
            res.status(204).send();
        } catch (e) {
            res.status(500).send({ msg: e.message });
        }
    }
}

module.exports = new ApiProduct();

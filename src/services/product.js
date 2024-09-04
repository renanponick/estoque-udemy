const product = require("../model/product");

class ServiceProduct {
    async FindAll(organizationId, transaction) {
        return product.findAll({ where: { organizationId }, transaction });
    }

    async FindById(organizationId, id, transaction) {
        return product.findOne({ where: { id, organizationId }, transaction });
    }

    async Create(name, description, organizationId, transaction) {
        if (!name) {
            throw new Error("Favor informar o nome do produto");
        }

        return product.create({ name, description, organizationId }, { transaction });
    }

    async Update(organizationId, id, name, description, transaction) {
        const existingProduct = await this.FindById(organizationId, id, transaction);

        existingProduct.name = name || existingProduct.name;
        existingProduct.description = description || existingProduct.description;

        await existingProduct.save({ transaction });

        return existingProduct;
    }

    async Delete(organizationId, id, transaction) {
        const existingProduct = await this.FindById(organizationId, id, transaction);

        if(!existingProduct) {
            throw new Error("Favor informar o produto corretamente")
        }

        await existingProduct.destroy({ transaction });
        return true;
    }
}

module.exports = new ServiceProduct();

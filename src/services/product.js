const product = require("../model/product");

class ServiceProduct {
    async FindAll(transaction) {
        return product.findAll({ transaction });
    }

    async FindById(id, transaction) {
        return product.findByPk(id, { transaction });
    }

    async Create(name, description, organizationId, transaction) {
        if (!name) {
            throw new Error("Please provide product name");
        }

        return product.create({ name, description, organizationId }, { transaction });
    }

    async Update(id, name, description, transaction) {
        const existingProduct = await this.FindById(id, transaction);

        existingProduct.name = name || existingProduct.name;
        existingProduct.description = description || existingProduct.description;

        await existingProduct.save({ transaction });

        return existingProduct;
    }

    async Delete(id, transaction) {
        const existingProduct = await this.FindById(id, transaction);
        await existingProduct.destroy({ transaction });
        return true;
    }
}

module.exports = new ServiceProduct();

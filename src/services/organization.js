const organization = require("../model/organization");
const user = require("./user");

class ServiceOrganization {
    async FindAll(transaction) {
        return organization.findAll({ transaction });
    }

    async FindById(id, transaction) {
        return organization.findByPk(id, { transaction });
    }

    async Create(name, address, phone, email, transaction) {
        if (!name) {
            throw new Error("Please provide organization name");
        } else if (!address) {
            throw new Error("Please provide organization address");
        } else if (!phone) {
            throw new Error("Please provide organization phone");
        } else if (!email) {
            throw new Error("Please provide organization email");
        }

        const org = await organization.create({ name, address, phone, email }, { transaction });

        await user.Create(email, name)

        return org
    }

    async Update(id, name, address, phone, email, transaction) {
        const existingOrganization = await this.FindById(id, transaction);

        existingOrganization.name = name || existingOrganization.name;

        await existingOrganization.save({ transaction });

        return existingOrganization;
    }

    async Delete(id, transaction) {
        const existingOrganization = await this.FindById(id, transaction);
        await existingOrganization.destroy({ transaction });
        return true;
    }
}

module.exports = new ServiceOrganization();

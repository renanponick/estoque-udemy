const generateRandomPassword = require("../fns/generate-password");
const organizationModel = require("../model/organization");
const userService = require("./user");

class ServiceOrganization {
    async FindById(id, transaction) {
        return organizationModel.findByPk(id, { transaction });
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

        const organization = await organizationModel.create(
            { name, address, phone, email },
            { transaction }
        );
        const password = generateRandomPassword(12)
        const user = await userService.Create(
            "admin",
            email,
            password,
            "admin",
            organization.id
        )

        return { organization, user: { ...user.dataValues, password: password } }
    }

    async Update(id, name, address, phone, email, transaction) {
        const existingOrganization = await this.FindById(id, transaction);

        existingOrganization.name = name || existingOrganization.name;
        existingOrganization.address = address || existingOrganization.address;
        existingOrganization.phone = phone || existingOrganization.phone;
        existingOrganization.email = email || existingOrganization.email;

        await existingOrganization.save({ transaction });

        return existingOrganization;
    }

    async Delete(id, transaction) {
        const existingOrganization = await this.FindById(id, transaction);
        if(!existingOrganization) {
            throw new Error("Favor informar a organização corretamente")
        }
        await existingOrganization.destroy({ transaction });
        return true;
    }
}

module.exports = new ServiceOrganization();

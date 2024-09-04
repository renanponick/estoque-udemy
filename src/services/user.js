const user = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypy = require('bcrypt')
const organization = require("../model/organization")

const secretKey = "M!nh4S3nh4Secreta"
const salt = 10
const roles = ['admin', 'employee']

class ServiceUser {
    async FindAll(organizationId, transaction) {
        return user.findAll({where: { organizationId }, transaction });
    }

    async FindById(organizationId, id, transaction) {
        return user.findOne({ where: { id, organizationId }, transaction })
    }

    async Create(name, email, password, role, organizationId, transaction) {
         if (!name) {
            throw new Error("Favor informar name")
        } else if (!email) {
            throw new Error("Favor informar email")
        } else if (!password) {
            throw new Error("Favor informar senha")
        } else if (!role || !roles.includes(role)) {
            throw new Error("Favor informar role corretamente, admin ou employee")
        } else if (!organizationId) {
            throw new Error("Favor informar organizationId")
        }

        const hasPass = await bcrypy.hash(password, salt)

        return user.create({
            name, email, password: hasPass, role, organizationId
        }, { transaction })
    }

    async Update(organizationId, id, name, email, password, role, actualRole, transaction) {
        const oldUser = await this.FindById(organizationId, id, transaction)

        if (role && !roles.includes(role)) {
            throw new Error("Favor informar role corretamente, admin ou employee")
        }

        if(actualRole == 'admin'){
            oldUser.role = role || oldUser.role
        }

        oldUser.name = name || oldUser.name
        oldUser.email = email || oldUser.email
        oldUser.password = password ? await bcrypy.hash(password, salt) : oldUser.password

        oldUser.save({ transaction })

        return oldUser
    }

    async Delete(organizationId, id, transaction) {
        const user = await this.FindById(organizationId, id, transaction)

        if(!user) {
            throw new Error("Favor informar o usuário corretamente")
        }

        user.destroy({ transaction })

        return true
    }

    async Login(email, password) {
        if (!email) {
            throw new Error("Favor informar email")
        } else if (!password) {
            throw new Error("Favor informar senha")
        }

        const currentUser = await user.findOne({ where: { email }, include: { model: organization } })

        if (!currentUser.email){
            throw new Error("Email ou senha inválidos")
        }

        const verify = await bcrypy.compare(password, currentUser.password)

        if(verify){
            return jwt.sign({
                id: currentUser.id,
                role: currentUser.role,
                organizationId: currentUser.organization.id
            }, secretKey, { expiresIn: 60 * 60 })
        }

        throw new Error("Email ou senha inválidos")
    }

    async Verify(id, role) {
        return user.findOne({ where: { id, role }})
    }
}

module.exports = new ServiceUser()
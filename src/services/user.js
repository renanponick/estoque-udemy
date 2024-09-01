const user = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypy = require('bcrypt')

const secretKey = "M!nh4S3nh4Secreta"
const salt = 10

class ServiceUser {
    async FindAll(transaction) {
        return user.findAll({ transaction });
    }

    async FindById(id, transaction) {
        return user.findByPk(id, { transaction })
    }

    async Create(email, password, transaction) {
         if (!email) {
            throw new Error("Favor informar email")
        } else if (!password) {
            throw new Error("Favor informar senha")
        }

        const hasPass = await bcrypy.hash(password, salt)

        return user.create({
           email, password: hasPass
        }, { transaction })
    }

    async Update(id, email, password, transaction) {
        const oldUser = await this.FindById(id, transaction)

        oldUser.email = email || oldUser.email
        oldUser.password = password ? await bcrypy.hash(password, salt) : oldUser.password

        oldUser.save({ transaction })

        return oldUser
    }

    async Delete(id, transaction) {
        const user = await this.FindById(id, transaction)

        user.destroy({ transaction })

        return true
    }

    async Login(email, password) {
        if (!email) {
            throw new Error("Favor informar email")
        } else if (!password) {
            throw new Error("Favor informar senha")
        }

        const currentUser = await user.findOne({ where: { email } })

        if (!currentUser){
            throw new Error("Email ou senha inválidos")
        }

        const verify = await bcrypy.compare(password, currentUser.password)

        if(verify){
            return jwt.sign({ id: currentUser.id }, secretKey, { expiresIn: 60 * 60 })
        }

        throw new Error("Email ou senha inválidos")
    }
}

module.exports = new ServiceUser()
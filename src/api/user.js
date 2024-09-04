const serviceUser = require("../services/user")

class ApiUser {
    async FindAll(req, res) {
        try {
            const organizationId = req.session.organizationId
            const result = await serviceUser.FindAll(organizationId)
            
            res.status(200).send({ result })
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }

    async FindById(req, res) {
        try {
            const organizationId = req.session.organizationId
            const userId = req.params.id || req.session.id

            const user = await serviceUser.FindById(organizationId, userId)

            res.status(200).send({ user })
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }

    async Create(req, res) {
        try {
            const organizationId = req.session.organizationId
            const { name, email, password, role } = req.body
            await serviceUser.Create(name, email, password, role, organizationId)
            
            res.status(201).send()
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }

    async Update(req, res) {
        try {
            const organizationId = req.session.organizationId
            const id = req.params.id || req.session.id
            const actualRole = req.session.role
            const { name, email, password, role } = req.body
            const user = await serviceUser.Update(organizationId, id, name, email, password, role, actualRole)
            
            res.status(200).send({ user })
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }

    async Delete(req, res) {
        try {
            const organizationId = req.session.organizationId
            const id = req.params.id || req.session.id
            await serviceUser.Delete(organizationId, id)
            
            res.status(204).send()
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }

    async Login(req, res) {
        try{
            const { email, password } = req.body
            const token = await serviceUser.Login(email, password)
            
            res.status(200).send({ token })
        } catch (e) {
            res.status(500).send({ msg: e.message })
        }
    }
}


module.exports = new ApiUser();
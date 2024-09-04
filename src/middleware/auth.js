const jwt = require('jsonwebtoken')
const user = require('../services/user')

function authMiddleware(role) {
    return (req, res, next) => {
        const token = req.headers["authorization"]
        
        if(!token) {
            res.status(400).json({ msg: "Token inválido ou não fornecido." })
            return
        }

        jwt.verify(token, "M!nh4S3nh4Secreta", async (err, decoded) => {
            if(err) {
                console.log(err)
                res.status(400).json({ msg: "Token inválido ou não fornecido." })
                return
            }

            const verified = await user.Verify(decoded.id, decoded.role)

            if(!verified || !decoded.role || (role && !role.includes(decoded.role))){
                return res.status(401).json({ message: 'Autorização Negada - Sem permissao' })
            }

            req.session = decoded
            next()
        })
    }
}

module.exports = authMiddleware
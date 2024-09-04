const express = require('express')
const userRouter = require('./src/routes/user')
const inventoryRouter = require('./src/routes/inventory')
const inventoryMovementRouter = require('./src/routes/inventoryMovement')
const productRouter = require('./src/routes/product')
const organizationRouter = require('./src/routes/organization')
const database = require('./src/database')
const apiUser = require('./src/api/user')

const app = express()
const porta = 3000
app.use(express.json())

app.post('/api/v1/login/', apiUser.Login)

app.use('/api/v1/organization', organizationRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/inventory', inventoryRouter)
app.use('/api/v1/inventoryMovement', inventoryMovementRouter)

database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(porta, () => {
            console.log('servidor rodando na porta ' + porta)
        })
    })
    .catch((e) => {
        console.error(`Não foi possivel conectar com o banco: ${e}`)
    })
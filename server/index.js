import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import sequelize from './db.js'
import cors from 'cors'
import {User, Role} from './models/index.js'
import router from './routes/index.js'
import ErrorHandlingMiddleware from './middlewares/ErrorHandlingMiddleware.js'

dotenv.config()

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(ErrorHandlingMiddleware)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync({ force: true })
        app.listen(PORT, () => console.log(PORT))
    } catch(e) {
        console.log(e)
    }
}

start()







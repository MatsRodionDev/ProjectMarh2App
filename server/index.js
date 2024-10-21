import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import sequelize from './db.js'

dotenv.config()

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()

        app.use(express.json())

        app.listen(PORT, () => console.log(PORT))
    } catch(e) {
        console.log(e)
    }
}







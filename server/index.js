import express from 'express'
import dotenv from 'dotenv'
import {sequelize} from './models/index.js'
import cors from 'cors'
import router from './routes/index.js'
import ErrorHandlingMiddleware from './middlewares/ErrorHandlingMiddleware.js'
import seedRoles from './seed/seedRoles.js'

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
            .then(() => {
                console.log("Tables were created!");
            })
            .catch((error) => {
                console.error("Error creating tables: ", error);
            });
        seedRoles()
        app.listen(PORT, () => console.log(PORT))
    } catch(e) {
        console.log(e)
    }
}

start()







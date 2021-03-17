import express, {Application} from 'express'
import dotenv from 'dotenv';

import UserRoutes from './router/api/users'
import sequelize from "./config/sequelize";
import bodyParser from "body-parser";

// Environment Variable Configuration
dotenv.config()

const port = process.env.port || 3000
const app: Application = express()

app.use(bodyParser.json())
app.use("/api/users", UserRoutes)

sequelize.authenticate().then(() => console.log("DB connected..")).catch(err => console.error(err))

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})
import express, {Application} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';

import UserRoutes from './router/api/users';
import sequelize from './config/sequelize';

// Environment Variable Configuration
dotenv.config();

const port = process.env.port || 5000;
const app: Application = express();

app.use(bodyParser.json());
app.use(cors({origin: true}));
app.use(httpContext.middleware);

app.use('/api/users', UserRoutes);

sequelize.authenticate().then(() => console.log('DB connected..')).catch(err => console.error(err));

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
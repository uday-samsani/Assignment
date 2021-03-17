import {Sequelize} from "sequelize";

const sequelize = new Sequelize('assignment', process.env.DBUsername||'postgres', process.env.DBPswd||"0mega99@2018", {
    host: process.env.DBHostURI || 'localhost',
    dialect: 'postgres'
});

export default sequelize
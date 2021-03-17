import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class User extends Model {
    public id!: number
    public firstname!: string
    public lastname!: string
    public email!: string
    public password!: string
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        firstname: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        lastname:{
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique:true
        },
        password:{
            type: new DataTypes.STRING(250),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        tableName: "users",
        sequelize,
    }
);

export default User;
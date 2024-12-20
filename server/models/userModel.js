import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Role from "./roleModel.js";
import Image from "./imageModel.js";

const User = sequelize.define('Users', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role, 
            key: 'id'
        },
        allowNull: false 
    },
    imageId: {
        type: DataTypes.INTEGER,
        references: {
            model: Image, 
            key: 'id'
        },
        allowNull: true 
    }
});

export default User;
// models/userModel.js
import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Role from "./roleModel.js";

const User = sequelize.define('User', { 
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
    }
});

export default User;
import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Project = sequelize.define('Projects', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        unique: true,
        allowNull: false 
    },
    isFinished: {
        type: DataTypes.BOOLEAN,
        allowNull: false 
    }
});

export default Project;
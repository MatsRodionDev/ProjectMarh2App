import sequelize from "../db.js";
import Task from "./taskModel.js";
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
        unique: false,
        allowNull: false 
    },
    isFinished: {
        type: DataTypes.BOOLEAN,
        allowNull: false 
    },
    projectTypeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ProjectTypes', 
            key: 'id'
        },
        allowNull: false
    },
    customerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Customers', // Имя таблицы
            key: 'id'
        },
        allowNull: false
    }
});

export default Project;
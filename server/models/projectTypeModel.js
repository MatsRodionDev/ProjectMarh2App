import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const ProjectType = sequelize.define('ProjectTypes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false 
    }
});

export default ProjectType;
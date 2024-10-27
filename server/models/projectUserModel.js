import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const ProjectUser = sequelize.define('ProjectUsers', {
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Projects', 
            key: 'id'
        },
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', 
            key: 'id'
        },
        allowNull: false
    }
});

export default ProjectUser
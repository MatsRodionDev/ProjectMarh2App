import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Role = sequelize.define('Roles', {     
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

export default Role;
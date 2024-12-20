import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false 
    }
});

export default Image;
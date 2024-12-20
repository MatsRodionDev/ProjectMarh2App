import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const Customer = sequelize.define('Customers', { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    contactInfo: {
        type: DataTypes.STRING,
        allowNull: true 
    }
});

export default Customer;
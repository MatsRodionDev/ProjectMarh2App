import sequelize from "../db.js";
import { DataTypes, HasMany } from "sequelize";
import User from "./userModel.js";

const Role = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

Role.hasMany(User)
User.belongsTo(Role)

export default Role
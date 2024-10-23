// models/index.js
import sequelize from "../db.js";
import User from './userModel.js';
import Role from './roleModel.js';

// Устанавливаем связи
Role.hasMany(User, { foreignKey: 'roleId' }); // Один ко многим
User.belongsTo(Role, { foreignKey: 'roleId' }); // Много к одному

export { User, Role };
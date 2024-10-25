import sequelize from "../db.js";
import User from './userModel.js';
import Role from './roleModel.js';

Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' }); 

export { User, Role };
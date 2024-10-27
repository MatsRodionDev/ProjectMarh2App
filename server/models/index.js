import User from './userModel.js';
import Role from './roleModel.js';
import Project from './projectModel.js';
import ProjectUser from './projectUserModel.js';
import sequelize from '../db.js';

//User -> Role
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' }); 

//Project <- ProjectUser -> User
Project.belongsToMany(User, { through: ProjectUser, foreignKey: 'projectId' });
User.belongsToMany(Project, { through: ProjectUser, foreignKey: 'userId' });

export { User, Role, Project , ProjectUser, sequelize};
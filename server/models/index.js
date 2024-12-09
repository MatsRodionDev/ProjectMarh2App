import User from './userModel.js';
import Role from './roleModel.js';
import Project from './projectModel.js';
import Task from './taskModel.js';
import ProjectUser from './projectUserModel.js';
import sequelize from '../db.js';

//User -> Role
Role.hasMany(User, { foreignKey: 'roleId' });

Project.belongsToMany(User, { through: ProjectUser, foreignKey: 'projectId' });
Project.hasMany(Task, { foreignKey: 'projectId' });

User.hasMany(Task, { foreignKey: 'userId' })
User.belongsToMany(Project, { through: ProjectUser, foreignKey: 'userId' });
User.belongsTo(Role, { foreignKey: 'roleId' }); 
User.hasOne(Task, { foreignKey: 'userId' })

Task.belongsTo(User, { foreignKey: 'userId' })
Task.belongsTo(Project, {
    foreignKey: 'projectId',
    onDelete: 'CASCADE'
});


export { User, Role, Project , ProjectUser, Task, sequelize};
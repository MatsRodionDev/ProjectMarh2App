import User from './userModel.js';
import Role from './roleModel.js';
import Project from './projectModel.js';
import Task from './taskModel.js';
import ProjectUser from './projectUserModel.js';
import ProjectType from './projectTypeModel.js';
import Customer from './customerModel.js';
import Image from './imageModel.js';
import sequelize from '../db.js';

//User -> Role
Role.hasMany(User, { foreignKey: 'roleId' });

Project.belongsToMany(User, { through: ProjectUser, foreignKey: 'projectId' });
Project.hasMany(Task, { foreignKey: 'projectId' });
Project.belongsTo(ProjectType, {foreignKey: 'projectTypeId'})
Project.belongsTo(Customer, {foreignKey: 'customerId'})

Customer.hasMany(Project, { foreignKey: 'customerId'})

ProjectType.hasMany(Project, {foreignKey: 'projectTypeId'})

User.hasMany(Task, { foreignKey: 'userId' })
User.belongsToMany(Project, { through: ProjectUser, foreignKey: 'userId' });
User.belongsTo(Role, { foreignKey: 'roleId' }); 
User.belongsTo(Image, { foreignKey: 'imageId'})
User.hasOne(Task, { foreignKey: 'userId' })

Image.hasOne(User, { foreignKey: 'imageId'})

Task.belongsTo(User, { foreignKey: 'userId' })
Task.belongsTo(Project, {
    foreignKey: 'projectId',
    onDelete: 'CASCADE'
});


export { User, Role, Project , ProjectType, Customer, ProjectUser, Task, Image, sequelize};
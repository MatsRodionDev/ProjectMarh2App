import { Project } from "../models/index.js"
import { ApiError } from "../Errors/ApiError.js"
import { Op } from "sequelize";
import {User} from "../models/index.js";
import {Task, Customer, ProjectType} from "../models/index.js";

 
class ProjectService {
    async addUserToProjectAsync(projectId, userId) {
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw ApiError.badRequest('Project with such id does not exist');
        }
    
        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('User with such id does not exist');
        }
    
        await project.addUser(user);
    }

    async createTaskForProjectAsync(projectId, taskData) {
        const project = await Project.findByPk(projectId);

        if (!project) {
            throw ApiError.badRequest('Project with such id does not exist');
        }
    
        await Task.create({
            ...taskData, 
            projectId: projectId 
        });
    }

    async getProjectByIdAsync(id) {
        const project = await Project.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] },
                    through: { attributes: [] } 
                },
                {
                    model: Task, 
                    attributes: ['id', 'title', 'description', 'isCompleted', 'deadline', 'userId']
                }
            ]
        });

        if(!project) {
            throw ApiError.badRequest('Project with such id doesnt exist')
        }

        return project
    }

    async getAllProjectsAsync() {
        const projects = await Project.findAll({
            include: [
                {
                    model: Customer, 
                    attributes: ['id', 'name'] 
                },
                {
                    model: ProjectType,
                    attributes: ['id', 'name'] 
                }
            ]
        });

        return projects
    }

    async getProjectByCriteria(criteria) {
        const { isFinished, name, customerId, projectTypeId, page = 1, pageSize = 5 } = criteria;

        const whereClause = {};
            
        if (isFinished !== undefined) {
            whereClause.isFinished = isFinished; 
        }

        if (customerId !== undefined && customerId !== null) {
            whereClause.customerId = customerId; 
        }

        if (projectTypeId !== undefined && projectTypeId !== null) {
            whereClause.projectTypeId = projectTypeId; 
        }
        
        if (name) {
            whereClause.name = {
                [Op.like]: `%${name}%` 
            };
        }
        const offset = (page - 1) * pageSize;

        const { count, rows } = await Project.findAndCountAll({
            where: whereClause,
            order: [['deadline', 'ASC']], 
            limit: pageSize, 
            offset: offset, 
            include: [
                {
                    model: Customer, 
                    attributes: ['id', 'name'] 
                },
                {
                    model: ProjectType,
                    attributes: ['id', 'name'] 
                },
                {
                    model: User,
                    attributes: { exclude: ['password'] },
                }
            ]
            
        });

            
        return {
            total: count, 
            totalPages: Math.ceil(count / pageSize), 
            currentPage: page, 
            projects: rows 
        };
    }

    async createProjectAsync(project) {
        return await Project.create(project)
    }

    async updateProjectAsync(id, updates) {
        const [updatedRows] = await Project.update(updates, {
            where: { id: id }
        });

        if (updatedRows === 0) {
            throw ApiError.badRequest('Project with such id doesnt exist');
        }
    }

    async deleteByIdAsync(id) {
        await Project.destroy({
            where: { id: id } 
        });
    }
}

export default new ProjectService()
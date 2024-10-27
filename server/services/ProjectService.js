import { Project } from "../models/index.js"
import { ApiError } from "../Errors/ApiError.js"
import { Op } from "sequelize";
import {User} from "../models/index.js";
 
class ProjectService {
    async getProjectByIdAsync(id) {
        const project = await Project.findByPk(id, {
            include: [{
                model: User,
                attributes: { exclude: ['password'] },
                through: { attributes: [] } 
            }]
        });
        if(!project) {
            throw ApiError.badRequest('Project with such id doesnt exist')
        }

        return project
    }

    async getAllProjectsAsync() {
        const projects = await Project.findAll()

        return projects
    }

    async getProjectByCriteria(criteria) {
        const { isFinished, name, page = 1, pageSize = 5 } = criteria;

        const whereClause = {};
            
        if (isFinished !== undefined) {
            whereClause.isFinished = isFinished; 
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
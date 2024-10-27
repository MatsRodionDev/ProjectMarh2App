import { Project } from "../models/index.js"

class ProjectService {
    async getProjectByIdAsync(id) {
        const project = await Project.findByPk(id)

        return project
    }

    async getAllProjectsAsync() {
        const projects = await Project.findAll()

        return projects
    }

    async getProjectByCriteria(criteria) {
        const { isFinished, name, page = 1, pageSize = 10 } = criteria;

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
        await Project.create(project)
    }

    async updateProjectAsync(project) {
        await Project.update(project)
    }
}

return new ProjectService()
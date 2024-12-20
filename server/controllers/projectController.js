import { CreateProjectDto } from "../dto/project/createProjectDto.js"
import ProjectService from "../services/ProjectService.js"
import { ApiError } from "../Errors/ApiError.js"
import { json } from "sequelize"

class ProjectController {
    async createProject(req, res, next) {
        try {
            await ProjectService.createProjectAsync(
                { isFinished: false, ...req.body})
            
            res.status(201).json()
        } catch(e) {
            next(e)
        }
    }

    async updateProject(req, res, next) {
        try {
            const {id} = req.props
            const { name, description, deadline } = req.body

            await ProjectService.updateProjectAsync(id, {
                name,
                description,
                deadline
            })

            res.status(204).json()
        } catch(e) {
            next(e)
        }
    }

    async deleteProject(req, res, next) {
        try {
            const {id} = req.props

            await ProjectService.deleteByIdAsync(id)

            res.status(204).json()
        } catch(e) {
            next(e)
        }
    }

    async getProjects(req, res, next) {
        try {
            const { isFinished, name, projectTypeId, customerId, page = 1, pageSize = 5 } = req.query;
    
            const criteria = {
                isFinished: isFinished === 'true' ? true : undefined,
                name: name || undefined,
                projectTypeId: projectTypeId ? parseInt(projectTypeId, 10) : undefined,
                customerId: customerId ? parseInt(customerId, 10) : undefined,
                page: parseInt(page, 10),
                pageSize: parseInt(pageSize, 10) 
            };
    
            const result = await ProjectService.getProjectByCriteria(criteria);
    
            res.status(200).json(result);
        } catch (e) {
            next(e); 
        }
    }

    async getProjectById(req, res, next) {
        try {
            const {id} = req.params

            const project = await ProjectService.getProjectByIdAsync(id)

            res.status(200).json(project)
        } catch(e) {
            next(e)
        }
    }

    async addUserToProject(req, res, next) {
        try {
            const { projectId } = req.params
            const { userId } = req.body

            console.log(userId)

            await ProjectService.addUserToProjectAsync(projectId, userId)

            res.status(201).json()
        } catch(e) {
            next(e)
        }
    }

    async createTaskToProject(req, res, next) {
        try {
            const { projectId } = req.params;
            const taskData = req.body;

            await ProjectService.createTaskForProjectAsync(projectId, taskData);

            res.status(201).json()
        } catch(e) {
            next(e)
        }
    }
}

export default new ProjectController()
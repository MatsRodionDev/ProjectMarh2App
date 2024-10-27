import { CreateProjectDto } from "../dto/project/createProjectDto.js"
import ProjectService from "../services/ProjectService.js"
import { ApiError } from "../Errors/ApiError.js"

class ProjectController {
    async createProject(req, res, next) {
        try {
            const { name, description, deadline } = req.body

            const project = await ProjectService.createProjectAsync(
                new CreateProjectDto(name, description, deadline, false))
            
            res.status(201).json(project)
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

            res.status(204)
        } catch(e) {
            next(e)
        }
    }

    async deleteProject(req, res, next) {
        try {
            const {id} = req.props

            if(!id) {
                throw ApiError.badRequest('Id wasnt specified')
            }

            await ProjectService.deleteByIdAsyn(id)

            res.status(204)
        } catch(e) {
            next(e)
        }
    }

    async getProjects(req, res, next) {
        try {
            const { isFinished, name, page = 1, pageSize = 5 } = req.query;
    
            const criteria = {
                isFinished: isFinished === 'true' ? true : isFinished === 'false' ? false : undefined,
                name: name || undefined,
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
}

export default new ProjectController()
import { ApiError } from "../Errors/ApiError.js";
import ProjectTypeService from "../services/ProjectTypeService.js";

class ProjectTypeController {
    async getProjectType(req, res, next) {
        try {
            const { projectTypeId } = req.params; 

            const projectType = await ProjectTypeService.getProjectTypeByIdAsync(projectTypeId);
            res.status(200).json(projectType); 
        } catch (e) {
            next(e); 
        }
    }

    async getAllProjectTypes(req, res, next) {
        try {
            const projectTypes = await ProjectTypeService.getAllProjectTypesAsync();
            res.status(200).json(projectTypes); 
        } catch (e) {
            next(e); 
        }
    }
}

export default new ProjectTypeController();
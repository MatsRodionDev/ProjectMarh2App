import { ProjectType } from "../models/index.js";
import { ApiError } from "../Errors/ApiError.js";

class ProjectTypeService {
    async getProjectTypeByIdAsync(projectTypeId) {
        const projectType = await ProjectType.findByPk(projectTypeId);
        if (!projectType) {
            throw ApiError.badRequest('ProjectType with such id does not exist');
        }

        return projectType;
    }

    async getAllProjectTypesAsync() {
        const projectTypes = await ProjectType.findAll();
        return projectTypes; 
    }
}

export default new ProjectTypeService();
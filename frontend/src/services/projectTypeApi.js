import { $authHost } from "./host";

class ProjectTypeAPI {
    async getAllProjectTypes() {
        try {
            const response = await $authHost.get('/api/types');
            return response.data; 
        } catch (error) {
            this.handleError(error, 'fetching project types');
        }
    }

    async getProjectTypeById(projectTypeId) {
        try {
            const response = await $authHost.get(`/api/types/${projectTypeId}`);
            return response.data; 
        } catch (error) {
            this.handleError(error, 'fetching the project type');
        }
    }

    handleError(error, action) {
        if (error.response) {
            throw new Error(error.response.data.message || `An error occurred while ${action}.`);
        } else if (error.request) {
            throw new Error('No response received from the server.');
        } else {
            throw new Error('Error: ' + error.message);
        }
    }
}

const projectTypeAPI = new ProjectTypeAPI();
export default projectTypeAPI;
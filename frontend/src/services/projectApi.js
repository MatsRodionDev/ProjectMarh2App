import { $authHost, $host } from "./host";

class ProjectApi {
    async getProjects(filters) {
        try {
            const response = await $host.get('/api/projects', {
                params: filters
            });
            return response.data; 
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while fetching projects.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }

    async getProjectById(projectId) {
        try {
            const response = await $host.get(`/api/projects/${projectId}`);
            return response.data; 
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while fetching the project.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }

    async deleteProjectById(projectId) {
        try {
            await $authHost.delete(`/api/projects/${projectId}`);
            return true;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while deleting the project.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }

    async createProject(project) {
        try {
            const response = await $authHost.post('/api/projects', project);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while creating the project.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }

    async updateProject(projectId, project) {
        try {
            const response = await $authHost.put(`/api/projects/${projectId}`, project);
            return response.data; 
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while updating the project.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }

    async addUserToProject(projectId, userId) {
        try {
            await $authHost.post(`/api/projects/${projectId}/user`, { userId });
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while adding the user to the project.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }

    async createTaskToProject(projectId, taskData) {
        try {
            await $authHost.post(`/api/projects/${projectId}/task`, taskData);
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while creating a task for the project.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }
}

const projectApi = new ProjectApi();
export default projectApi;
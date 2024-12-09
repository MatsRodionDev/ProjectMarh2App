import {  $authHost ,$host } from "./host"

class ProjectApi {
    async getProjects(filters) {
        try {
            const response = await $host.get('/api/projects', {
                params: filters
            });
            
            return response.data; 
        } catch (error) {
            console.error('Error fetching projects:', error.response ? error.response.data : error.message);
        }
    }

    async getProjectById(projectId) {
        try {
            const response = await $host.get(`/api/projects/${projectId}`);
           
            return response.data; 
        } catch (error) {
            console.error('Error fetching project:', error.response ? error.response.data : error.message);
        }
    }

    async deleteProjectById(projectId) {
        try {
            const response = await $authHost.delete(`/api/projects/${projectId}`)

            return true
        } catch (error) {
            console.error('Error deleting project:', error.response ? error.response.data : error.message);
            return false
        }
    }

    async cerateProject(project) {
        try {
            const response = await $authHost.post('/api/projects', project)

            return response.data
        } catch (error) {
            console.error('Error creating project:', error.response ? error.response.data : error.message);
        }
    }

    async updateProject(projectId, project) {
        try {
            const response = await $authHost.put(`/api/projects/${projectId}`, project);
            
            return response.data; 
        } catch (error) {
            console.error('Error updating project:', error.response ? error.response.data : error.message);
        }
    }
}

const projectApi = new ProjectApi()
export default projectApi;
    import { $authHost } from "./host";

    class TaskApi {
        async addUserToTask(taskId, userId) {
            try {
                const response = await $authHost.post(`/api/tasks/${taskId}/user`, {
                    userId: userId
                });

                if (response.status >= 200 && response.status < 300) {
                    return response.data; 
                }
            } catch (error) {
                if (error.response) {
                    throw new Error(error.response.data.message || 'An error occurred while taking the task.');
                } else if (error.request) {
                    throw new Error('No response received from the server.');
                } else {
                    throw new Error('Error: ' + error.message);
                }
            }
        }

        async deleteUserFromTask(taskId, userId) {
            try {
                await $authHost.delete(`/api/tasks/${taskId}/user/${userId}`);
            } catch (error) {
                if (error.response) {
                    throw new Error(error.response.data.message || 'An error occurred while removing the user from the task.');
                } else if (error.request) {
                    throw new Error('No response received from the server.');
                } else {
                    throw new Error('Error: ' + error.message);
                }
            }
        }

        async closeTask(taskId) {
            try {
                await $authHost.patch(`/api/tasks/${taskId}/close`);
            } catch (error) {
                if (error.response) {
                    throw new Error(error.response.data.message || 'An error occurred while closing the task.');
                } else if (error.request) {
                    throw new Error('No response received from the server.');
                } else {
                    throw new Error('Error: ' + error.message);
                }
            }
        }

        async deleteTask(taskId) {
            try {
                await $authHost.delete(`/api/tasks/${taskId}`);
            } catch (error) {
                if (error.response) {
                    throw new Error(error.response.data.message || 'An error occurred while deleting the task.');
                } else if (error.request) {
                    throw new Error('No response received from the server.');
                } else {
                    throw new Error('Error: ' + error.message);
                }
            }
        }
    }

    export default new TaskApi();
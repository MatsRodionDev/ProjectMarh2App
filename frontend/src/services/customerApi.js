import { $authHost } from "./host";

class CustomerApi {
    async addCustomer(customerData) {
        try {
            const response = await $authHost.post(`/api/customers`, customerData);

            if (response.status >= 200 && response.status < 300) {
                return response.data; 
            }
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while adding the customer.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }

    async deleteCustomer(customerId) {
        try {
            await $authHost.delete(`/api/customers/${customerId}`);
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while deleting the customer.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }

    async updateCustomer(customerId, customerData) {
        try {
            const response = await $authHost.patch(`/api/customers/${customerId}`, customerData);
            return response.data; 
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while updating the customer.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }

    async getCustomer(customerId) {
        try {
            const response = await $authHost.get(`/api/customers/${customerId}`);
            return response.data; 
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while fetching the customer.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }

    async getAllCustomers() {
        try {
            const response = await $authHost.get(`/api/customers`);
            return response.data; 
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || 'An error occurred while fetching customers.');
            } else if (error.request) {
                throw new Error('No response received from the server.');
            } else {
                throw new Error('Error: ' + error.message);
            }
        }
    }
}

export default new CustomerApi();
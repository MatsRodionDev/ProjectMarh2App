import { Customer } from "../models/index.js";
import { ApiError } from "../Errors/ApiError.js";

class CustomerService {
    async addCustomerAsync(data) {
        const { name, contactInfo } = data;

        if (!name) {
            throw ApiError.badRequest('Customer name is required');
        }

        const customer = await Customer.create({ name, contactInfo });
        return customer;
    }

    async getCustomerByIdAsync(customerId) {
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            throw ApiError.badRequest('Customer with such id does not exist');
        }

        return customer;
    }

    async getAllCustomersAsync() {
        const customers = await Customer.findAll();
        return customers; 
    }

    async updateCustomerAsync(customerId, data) {
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            throw ApiError.badRequest('Customer with such id does not exist');
        }

        const { name, contactInfo } = data;
        if (name) {
            customer.name = name;
        }
        if (contactInfo) {
            customer.contactInfo = contactInfo;
        }

        await customer.save();
        return customer;
    }

    async deleteCustomerAsync(customerId) {
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            throw ApiError.badRequest('Customer with such id does not exist');
        }

        await customer.destroy();
    }
}

export default new CustomerService();
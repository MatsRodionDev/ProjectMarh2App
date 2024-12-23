import CustomerService from "../services/CustomerService.js";

class CustomerController {
    async addCustomer(req, res, next) {
        try {
            const customerData = req.body; 

            const customer = await CustomerService.addCustomerAsync(customerData);
            res.status(201).json(customer); 
        } catch (e) {
            next(e);
        }
    }

    async getCustomer(req, res, next) {
        try {
            const { customerId } = req.params; 

            const customer = await CustomerService.getCustomerByIdAsync(customerId);
            res.status(200).json(customer);
        } catch (e) {
            next(e);
        }
    }

    async getAllCustomers(req, res, next) {
        try {
            const customers = await CustomerService.getAllCustomersAsync();
            res.status(200).json(customers); // Возвращаем всех заказчиков
        } catch (e) {
            next(e);
        }
    }

    async updateCustomer(req, res, next) {
        try {
            const { customerId } = req.params;
            const customerData = req.body; 

            const updatedCustomer = await CustomerService.updateCustomerAsync(customerId, customerData);
            res.status(200).json(updatedCustomer); 
        } catch (e) {
            next(e);
        }
    }

    async deleteCustomer(req, res, next) {
        try {
            const { customerId } = req.params; 

            await CustomerService.deleteCustomerAsync(customerId);
            res.status(204).json(); 
        } catch (e) {
            next(e);
        }
    }
}

export default new CustomerController();
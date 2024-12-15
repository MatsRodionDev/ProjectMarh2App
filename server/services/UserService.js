import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import bcrypt from 'bcrypt'; 
import { ApiError } from "../Errors/ApiError.js"; 

class UserService {
    async getByEmailAsync(email) {
        const user = await User.findOne({
            where: { email: email },
            include: [{
                model: Role, 
                attributes: ['id', 'name'] 
            }]
        });

        return user;
    }

    async getByIdAsync(id) {
        const user = await User.findByPk(id, {
            include: [{
                model: Role, 
                attributes: ['id', 'name'] 
            }]
        });

        if (!user) {
            throw ApiError.badRequest('User not found');
        }

        return user;
    }

    async createAsync(dto) {
        const user = { ...dto, roleId: 1 };
        await User.create(user);
        return user;
    }

    async getAllUsersAsync() {
        const users = await User.findAll();
        return users;
    }

    async changePasswordAsync(userId, oldPassword, newPassword) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw ApiError.badRequest('User not found');
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw ApiError.badRequest('Old password is incorrect');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.update({ password: hashedPassword }, {
            where: { id: userId }
        });
    }
}

export default new UserService();
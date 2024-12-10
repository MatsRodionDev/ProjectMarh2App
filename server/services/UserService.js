import User from '../models/userModel.js';
import Role from '../models/roleModel.js';

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

        return user;
    }

    async createAsync(dto) {
        const user = { ...dto, roleId: 1 };
        await User.create(user);
        return user;
    }

    // Новый метод для получения всех пользователей без ролей
    async getAllUsersAsync() {
        const users = await User.findAll();
        return users;
    }
}

export default new UserService();
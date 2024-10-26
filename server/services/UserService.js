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

        console.log(user)

        return user
    }

    async createAsync(dto) {
        const user = {...dto, roleId: 1}
        await User.create(user)

        return user
    }
}

export default new UserService()
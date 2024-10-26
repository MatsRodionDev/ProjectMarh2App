import User from '../models/userModel.js';

class UserService {
    async getByEmailAsync(email) {
        return await User.findOne({where: {email: email}})
    }

    async createAsync(dto) {
        console.log(dto)
        await User.create({...dto, roleId: 1})
    }
}

export default new UserService()
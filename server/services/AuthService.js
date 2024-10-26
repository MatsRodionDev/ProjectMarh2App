import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import UserService  from './UserService.js';
import RoleService from './RoleService.js';
import { ApiError } from '../Errors/ApiError.js';

class AuthService {
    async login(email, password) {
        const user = await UserService.getByEmailAsync(email)

        if(!user) {
            throw ApiError.badRequest('Incorrect email or password')
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw ApiError.badRequest('Incorrect email or password')
        }

        return this.createToken(user.id, user.email, user.Role)
    }

    async register(dto) {
        console.log(dto)

        const user = await UserService.getByEmailAsync(dto.email)

        if(user) {
            throw ApiError.badRequest('User with with such email already exists')
        }

        const passHash = await bcrypt.hash(dto.password, 10)
        dto.password = passHash

        const newUser = await UserService.createAsync(dto)

        console.log(newUser)

        const role = await RoleService.getRoleByIdAsync(newUser.roleId)

        return this.createToken(dto.is, dto.email, role)
    }

    createToken(id, email, role) {
        return jwt.sign({id: id, email: email, roles: role.name}, 'secretkey')
    }
}

export default new AuthService()
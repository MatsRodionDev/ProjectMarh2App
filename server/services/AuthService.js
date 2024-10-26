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

        await UserService.createAsync(dto)

        const newUser = await UserService.getByEmailAsync(dto.email)

        return this.createToken(newUser.id, dto.email, newUser.Role)
    }

    async refreshJwtAsync(id) {
        const user = await UserService.getByIdAsync(id)

        if(!user) {
            throw ApiError.forbidden()
        }

        return this.createToken(user.id, user.email, user.Role)
    }

    createToken(id, email, role) {
        return jwt.sign({id: id, email: email, roles: role.name}, 'secretkey')
    }
}

export default new AuthService()
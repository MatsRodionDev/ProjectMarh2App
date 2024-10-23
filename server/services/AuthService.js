import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import UserService  from './UserService.js';
import { ApiError } from '../Errors/ApiError.js';

class AuthService {
    async login(email, password) {
        const user = await UserService.getByEmailAsync(email)

        console.log(user + '+++++++')
        console.log(!user + '-------')

        if(!user) {
            throw ApiError.badRequest('Incorrect email or password')
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw ApiError.badRequest('Incorrect email or password')
        }

        return this.createToken(user.id, user.email)
    }

    async register(dto) {
        console.log(dto)

        const user = await UserService.getByEmailAsync(dto.email)

        if(user) {
            throw ApiError.badRequest('User with with such email already exists')
        }

        console.log('--------------------------')

        const passHash = await bcrypt.hash(dto.password, 10)
        dto.password = passHash

        await UserService.createAsync(dto)

        return this.createToken(dto.is, dto.email)
    }

    createToken(id, email) {
        return jwt.sign({id: id, email: email}, 'secretkey')
    }
}

export default new AuthService()
import { CreateUserDto } from "../dto/user/createUserDto.js"
import AuthService from "../services/AuthService.js"

class AuthController{
    async registration(req, res, next) {
        try {
            const { firstname, lastname, email, password } = req.body

            console.log(firstname,lastname)

            const token = await AuthService.register(new CreateUserDto(firstname, lastname, email, password))

            res.status(200).json({token: token})
        } catch(e) {
            console.log(e)
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password} = req.body

            const token = await AuthService.login(email, password)

            res.status(200).json({token: token})
        } catch(e) {
            console.log(e)
            next(e)
        }
    }

    async isAuth(req, res, next) {
        try {
            const user = req.user

            const token = await AuthService.refreshJwtAsync(user.id)

            res.status(200).json({token: token})
        } catch(e) {
            next(e)
        }
    }
}

export default new AuthController()
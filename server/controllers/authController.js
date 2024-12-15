import { CreateUserDto } from "../dto/user/createUserDto.js"
import AuthService from "../services/AuthService.js"
import UserService from "../services/UserService.js"

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

    async changPass(req, res, next) {
        try {
            const { id } = req.user;
            const {newPass, currentPass} = req.body

            console.log(id)
            console.log(newPass)
            console.log(currentPass)

            await UserService.changePasswordAsync(id, currentPass, newPass)

            res.status(200).json()
        } catch(e) {
            next(e)
        }
    }
}

export default new AuthController()
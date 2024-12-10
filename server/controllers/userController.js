import { ApiError } from "../Errors/ApiError.js";
import UserService from "../services/UserService.js";

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsersAsync();
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.getByIdAsync(id);

            if (!user) {
                return next(ApiError.notFound('User not found'));
            }

            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
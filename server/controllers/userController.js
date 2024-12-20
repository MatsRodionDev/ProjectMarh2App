import { ApiError } from "../Errors/ApiError.js";
import UserService from "../services/UserService.js";

class UserController {
    async uploadImage(req, res, next) {
        try {
            const file = req.file;

            if (!file) {
                throw ApiError.badRequest("No file uploaded");
            }

            await UserService.saveUserImageAsync(req.user.id, file.filename);

            res.status(200).json({ message: "Image uploaded successfully", imageUrl: `http://localhost:7000/uploads/images/${file.filename}` });
        } catch (e) {
            next(e);
        }
    }

    async deleteImage(req, res, next)
    {
        try {
            await UserService.deleteImageAsync(req.user.id);

            res.status(201).json();
        } catch (e) {
            next(e);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 0; 
            const limit = parseInt(req.query.limit) || 10; 

            const users = await UserService.getAllUsersAsync(page, limit);

            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await UserService.genAllAsync();

            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.user;
            const user = await UserService.getByIdAsync(id);

            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    async updateUserRole(req, res, next) {
        try{
            const { id } = req.params
            const { role } = req.body;

            console.log(id+ role)

            await UserService.updateUserRoleAsync(id, role)

            res.status(200).json()
        } catch(e){
            next(e)
        }
    }
}

export default new UserController();
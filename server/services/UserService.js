import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import Image from '../models/imageModel.js';
import bcrypt from 'bcrypt'; 
import { ApiError } from "../Errors/ApiError.js"; 
import fs from "fs";
import path from "path";

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
            },
            {
                model: Image, 
                attributes: ['id', 'fileName'] 
            }]
        });

        if (!user) {
            throw ApiError.badRequest('User not found');
        }

        

        return user;
    }

    async createAsync(dto) {
        const user = { ...dto, roleId: 1 };
        await User.create(user);
        return user;
    }

    async getAllUsersAsync(page = 0, limit = 10) {
        const offset = page * limit;
    
        const { count, rows } = await User.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']],
            include: [{
                model: Role, 
                attributes: ['id', 'name'] 
            }]
        });
    
        return {
            total: count,
            users: rows
        };
    }

    async genAllAsync()
    {
        return await User.findAll()
    } 

    async changePasswordAsync(userId, oldPassword, newPassword) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw ApiError.badRequest('User not found');
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw ApiError.badRequest('Old password is incorrect');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.update({ password: hashedPassword }, {
            where: { id: userId }
        });
    }

    async updateUserRoleAsync(userId, roleData) {
        const user = await this.getByIdAsync(userId);
        const role = await Role.findOne({ where: { name: roleData } });
    
        if (!role) {
            throw ApiError.badRequest('Role not found');
        }
    
        await User.update({ roleId: user.roleId }, { where: { id: userId } });

    }

    async deleteImageAsync(userId){
        var user = await User.findByPk(userId, {
            include: [{
                model: Image, 
                attributes: ['id', 'fileName'] 
            }]
        })

        if (user.Image) {
            this.deleteFile(user)
            await user.Image.destroy(); 
        }

        await user.save()
    }

    deleteFile(user)
    {
        var imagePath = `./uploads/images/${user.Image.fileName}`

        const absolutePath = path.resolve(imagePath);

        fs.unlink(absolutePath, async (err) => {
            if (err) {
                throw new ApiError("Failed to delete file", 500);
            }
        });
    }

    async saveUserImageAsync(userId, fileName)
    {
        var user = await User.findByPk(userId, {
            include: [{
                model: Image, 
                attributes: ['id', 'fileName'] 
            }]
        })

        console.log(user)

        if(user.Image){
            this.deleteFile(user)

            user.Image.fileName = fileName;
            await user.save();
            return
        }

        var image = await Image.create({
            fileName: fileName
        })

        user.imageId = image.id
        await user.save();
    }
}

export default new UserService();
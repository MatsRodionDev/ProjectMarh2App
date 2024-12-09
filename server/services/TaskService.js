import { Task } from "../models/index.js";
import { ApiError } from "../Errors/ApiError.js";
import { User } from "../models/index.js";

class TaskService {
    async addUserToTaskAsync(taskId, userId) {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw ApiError.badRequest('Task with such id does not exist');
        }

        if (task.userId) {
            throw ApiError.badRequest('This task has already been taken');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiError.badRequest('User with such id does not exist');
        }

        await task.setUser(user);
    }

    async deleteTaskAsync(taskId) {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw ApiError.badRequest('Task with such id does not exist');
        }

        await task.destroy(); 
    }

    async closeTaskAsync(taskId) {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw ApiError.badRequest('Task with such id does not exist');
        }

        console.log(task)

        if (task.isCompleted) {
            throw ApiError.badRequest('This task is already closed');
        }

        task.isCompleted = true; 
        await task.save();
    }

    async rejectTaskAsync(taskId, userId) {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw ApiError.badRequest('Task with such id does not exist');
        }

        if (task.userId != userId) {
            throw ApiError.badRequest('You cannot reject this task because you do not own it');
        }

        task.userId = null; 
        await task.save(); 
    }
}

export default new TaskService();
import TaskService from "../services/TaskService.js";

class TaskController {
    async addUserToTask(req, res, next) {
        try {
            const { taskId } = req.params;
            const { userId } = req.body;

            await TaskService.addUserToTaskAsync(taskId, userId);
            res.status(201).json(); 
        } catch (e) {
            next(e);
        }
    }

    async deleteUserFromTask(req, res, next) {
        try {
            const { taskId, userId } = req.params;

            console.log(taskId + ' ' + userId)

            await TaskService.rejectTaskAsync(taskId, userId); 
            res.status(200).json(); 
        } catch (e) {
            next(e);
        }
    }

    async closeTask(req, res, next) {
        try {
            const { taskId } = req.params;

            await TaskService.closeTaskAsync(taskId);
            res.status(200).json(); 
        } catch (e) {
            next(e);
        }
    }

    async deleteTask(req, res, next) {
        try {
            const { taskId } = req.params;

            await TaskService.deleteTaskAsync(taskId);
            res.status(200).json(); 
        } catch (e) {
            next(e);
        }
    }
}

export default new TaskController();
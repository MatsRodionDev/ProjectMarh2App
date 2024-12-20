import RoleService from "../services/RoleService.js"

class RoleController {
    async getAllRolesAsync(req, res, next) {
        try {
            const roles = await RoleService.getAllRolesAsync()

            res.status(200).json(roles)
        } catch (e)
        {
            next(e)
        }
    }
}

export default new RoleController()
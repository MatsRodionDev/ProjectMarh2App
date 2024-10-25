import { Role } from "../models"

class RoleService {
    async getRoleByIdAsync(id) {
        return await Role.findByPk(id)
    }
}   

export default new RoleService()
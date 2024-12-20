import  Role  from "../models/roleModel.js"

class RoleService {
    async getRoleByIdAsync(id) {
        return await Role.findByPk(id)
    }

    async getAllRolesAsync()
    {
        return await Role.findAll()
    }
}   

export default new RoleService()
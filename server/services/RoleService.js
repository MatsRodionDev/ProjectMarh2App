import  Role  from "../models/roleModel.js"

class RoleService {
    async getRoleByIdAsync(id) {
        return await Role.findByPk(id)
    }
}   

export default new RoleService()
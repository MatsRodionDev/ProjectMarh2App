import Role from "../models/roleModel.js"; 

export default async () => {
    const roles = [
        { name: 'Admin' },
        { name: 'Worker' },
        { name: 'Manager' }
    ];

    try {
        await Role.bulkCreate(roles);
        console.log('Roles were added successfully');
    } catch (error) {
        console.error('Error adding roles:', error);
    }
}
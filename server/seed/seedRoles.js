import User from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Role from "../models/roleModel.js"; // Импортируем модель Role
import Task from "../models/taskModel.js"; // Импортируем модель Task
import bcrypt from 'bcrypt'; // Импортируем bcrypt

export default async () => {
    const roles = [
        { name: 'Admin' },
        { name: 'Worker' },
        { name: 'Manager' }
    ];

    const users = [
        { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123', roleId: 1 },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password123', roleId: 2 },
        { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', password: 'password123', roleId: 3 },
        { firstName: 'Bob', lastName: 'Brown', email: 'bob@example.com', password: 'password123', roleId: 1 },
        { firstName: 'Charlie', lastName: 'Davis', email: 'charlie@example.com', password: 'password123', roleId: 2 },
        { firstName: 'Eve', lastName: 'White', email: 'eve@example.com', password: 'password123', roleId: 3 },
        { firstName: 'Mallory', lastName: 'Black', email: 'mallory@example.com', password: 'password123', roleId: 1 },
        { firstName: 'Trent', lastName: 'Green', email: 'trent@example.com', password: 'password123', roleId: 2 },
        { firstName: 'Oscar', lastName: 'Clark', email: 'oscar@example.com', password: 'password123', roleId: 3 },
        { firstName: 'Peggy', lastName: 'Adams', email: 'peggy@example.com', password: 'password123', roleId: 1 }
    ];

    const projects = [
        { name: 'Project Alpha', description: 'Description for Project Alpha', deadline: new Date('2024-12-31'), isFinished: false },
        { name: 'Project Beta', description: 'Description for Project Beta', deadline: new Date('2025-01-15'), isFinished: false },
        { name: 'Project Gamma', description: 'Description for Project Gamma', deadline: new Date('2025-03-10'), isFinished: false },
        { name: 'Project Delta', description: 'Description for Project Delta', deadline: new Date('2025-05-20'), isFinished: false },
        { name: 'Project Epsilon', description: 'Description for Project Epsilon', deadline: new Date('2025-07-30'), isFinished: true },
        { name: 'Project Zeta', description: 'Description for Project Zeta', deadline: new Date('2025-09-15'), isFinished: false },
        { name: 'Project Eta', description: 'Description for Project Eta', deadline: new Date('2026-01-01'), isFinished: false },
        { name: 'Project Theta', description: 'Description for Project Theta', deadline: new Date('2026-03-15'), isFinished: true },
        { name: 'Project Iota', description: 'Description for Project Iota', deadline: new Date('2026-06-01'), isFinished: false },
        { name: 'Project Kappa', description: 'Description for Project Kappa', deadline: new Date('2026-08-20'), isFinished: false }
    ];

    const tasks = [
        { title: 'Design homepage', description: 'Create a mockup for the homepage', isCompleted: false, deadline: new Date('2024-11-01'), projectId: 1, userId: 1 },
        { title: 'Implement login feature', description: 'Build the login functionality', isCompleted: false, deadline: new Date('2024-11-15'), projectId: 1, userId: 2 },
        { title: 'Test homepage', description: 'Perform testing on the homepage design', isCompleted: false, deadline: new Date('2024-11-20'), projectId: 1, userId: 3 },
        { title: 'Setup database', description: 'Configure the database for the project', isCompleted: true, deadline: new Date('2024-10-15'), projectId: 2, userId: 4 },
        { title: 'Create API endpoints', description: 'Develop the necessary API endpoints', isCompleted: false, deadline: new Date('2025-01-10'), projectId: 2, userId: 5 },
        { title: 'Conduct user testing', description: 'Gather feedback from users', isCompleted: false, deadline: new Date('2025-02-01'), projectId: 3, userId: 1 },
        { title: 'Final project presentation', description: 'Prepare the final presentation for stakeholders', isCompleted: false, deadline: new Date('2025-03-05'), projectId: 3, userId: 2 },
        { title: 'Deploy application', description: 'Deploy the application to production', isCompleted: false, deadline: new Date('2025-04-10'), projectId: 4, userId: 3 },
        { title: 'Create user documentation', description: 'Write documentation for users', isCompleted: false, deadline: new Date('2025-05-01'), projectId: 4, userId: 4 },
        { title: 'Collect feedback from users', description: 'Gather user feedback post-launch', isCompleted: false, deadline: new Date('2025-06-01'), projectId: 5, userId: 5 }
    ];

    try {
        // Сначала создаем роли
        await Role.bulkCreate(roles);
        console.log('Roles were added successfully');

        // Затем создаем пользователей с хешированием паролей
        const hashedUsers = await Promise.all(users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return { ...user, password: hashedPassword };
        }));

        await User.bulkCreate(hashedUsers);
        console.log('Users were added successfully');

        // Наконец, создаем проекты
        await Project.bulkCreate(projects);
        console.log('Projects were added successfully');

        // Создаем задачи
        await Task.bulkCreate(tasks);
        console.log('Tasks were added successfully');
    } catch (error) {
        console.error('Error adding data:', error);
    }
};
export class CreateProjectDto {
    constructor(name, description, deadline, isFinished, customerId, projectTypeId){
        this.name = name
        this.description = description
        this.deadline = deadline
        this.isFinished = isFinished
        this.customerId = customerId,
        this.projectTypeId = projectTypeId
    }
}
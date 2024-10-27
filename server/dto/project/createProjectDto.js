export class CreateProjectDto {
    constructor(name, description, deadline, isFinished){
        this.name = name
        this.description = description
        this.deadline = deadline
        this.isFinished = isFinished
    }
}
export class CreateUserDto {
    constructor(firstname, lastname, email, password){
        this.firstName = firstname
        this.lastName = lastname
        this.email = email
        this.password = password
    }
}
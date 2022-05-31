import { UserInterface } from "./UserInterface"

class User implements UserInterface {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(userID: number, firstName: string, lastName: string, email: string){
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

export { User }
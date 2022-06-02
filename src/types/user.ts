enum UserInputs {firstName = "firstName", lastName = "lastName", email = "email", password = "password"}

interface IUser {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

}
class User implements IUser {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(user?: IUser) {
        this.userID = user?.userID ?? "-1";
        this.firstName = user?.firstName ?? "";
        this.lastName = user?.lastName ?? "";
        this.email = user?.email ?? "";
        this.password = user?.password ?? "";
    }
}

export { UserInputs, User };

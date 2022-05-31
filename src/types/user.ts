enum UserInputs {userID = "userID", firstName = "firstName", lastName = "lastName", email = "email"}

interface IUser {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;
}
class User implements IUser {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(test?: IUser) {
        this.userID = test?.userID ?? -1;
        this.firstName = test?.firstName ?? "";
        this.lastName = test?.lastName ?? "";
        this.email = test?.email ?? "";
    }
}

export { UserInputs, User };

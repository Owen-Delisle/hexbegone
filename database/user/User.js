class User {
    userID;
    firstName;
    lastName;
    email;

    constructor(userID, firstName, lastName, email){
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

module.exports = User;
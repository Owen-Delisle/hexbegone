const   config      = require('./config.js'),
        sql         = require('mssql');

const getUsers = async() => {
    try {
        let pool = await sql.connect(config);
        let users = pool.request().query("SELECT * from Users");
        console.log(users);
        return users;
    } catch(err) {
        console.log(err);
    }
}

const createUser = async(newUser) => {
    try {
        let pool = await sql.connect(config);
        let users = pool.request().query(`INSERT INTO Users VALUES
        (${newUser.userID}, '${newUser.firstName}', '${newUser.lastName}', '${newUser.email}')`);
        console.log(users);
        return users;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getUsers,
    createUser
}
const   config      = require('./config.js'),
        sql         = require('mssql');


const userDB = 'Users'

const getUser = async(firstName) => {
    console.log("FIRST NAME:", firstName)
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query(`SELECT * from ${userDB} WHERE FirstName = '${firstName}'`);
        console.log(users);
        return users;
    } catch(err) {
        console.log(err);
    }
}

const getUsers = async() => {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query(`SELECT * from ${userDB}`);
        console.log(users);
        return users;
    } catch(err) {
        console.log(err);
    }
}

const createUser = async(newUser) => {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query(`INSERT INTO ${userDB} VALUES
        ('${newUser.userID}', '${newUser.firstName}', '${newUser.lastName}', '${newUser.email}')`);
        console.log(users);
        return users;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    getUsers,
    createUser,
    getUser
}
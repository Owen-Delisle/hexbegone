const argon2 = require('argon2');

const config = require('./config.js')
const sql = require('mssql');


const userDB = 'Users'

const getUser = async (email, password) => {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request().query(`SELECT * from ${userDB} WHERE Email = '${email}'`);
        return user;
    } catch (err) {
        console.log(err);
    }
}

const getUsers = async () => {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query(`SELECT * from ${userDB}`);
        console.log(users);
        return users;
    } catch (err) {
        console.log(err);
    }
}

const createUser = async (newUser) => {
    try {
        let pool = await sql.connect(config);
        const hash = await argon2.hash(newUser.password, {
            type: argon2.argon2d,
            memoryCost: 2 ** 16,
            hashLength: 50,
        });
        let users = await pool.request().query(`INSERT INTO ${userDB} VALUES
        ('${newUser.userID}', '${newUser.firstName}', '${newUser.lastName}', '${newUser.email}', '${hash}')`);
        return users;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getUsers,
    createUser,
    getUser
}
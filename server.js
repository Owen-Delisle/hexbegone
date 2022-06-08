const express = require('express');
const app = express();
const argon2 = require('argon2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const dbOperations = require('./database/operations');

const API_PORT = process.env.PORT || 4000;

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const result = await dbOperations.getUser(email, password)
    const match = await argon2.verify(result.recordset[0].Password, password)

    if(match) {
        const accessToken = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET)
        res.send({accessToken: accessToken})
    } else {
        res.send({accessToken: ""})
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user() = user
        next()
    })
    
}

app.get('/peepToken', authenticateToken, (req, res) => {

})

app.post('/create', async (req, res) => {
    await dbOperations.createUser(req.body);
    const result = await dbOperations.getUser(req.body.firstName)
    res.send(result.recordset)
})

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

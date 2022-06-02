const express = require('express'),
    dbOperations = require('./database/operations')
cors = require('cors');

const API_PORT = process.env.PORT || 4000;
const app = express();
const argon2 = require('argon2');

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/login', async (req, res) => {
    console.log('Called');
    const result = await dbOperations.getUser(req.body.email, req.body.password)
    console.log("DOOKIE", result.recordset[0].Password)
    const match = await argon2.verify(result.recordset[0].Password, req.body.password)
    console.log(match);
    // res.send(result.recordset)
})

app.post('/create', async (req, res) => {
    await dbOperations.createUser(req.body);
    const result = await dbOperations.getUser(req.body.firstName)
    res.send(result.recordset)
})

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

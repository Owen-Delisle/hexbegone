import express from 'express';

const app = express();
const argon2 = require('argon2');
const cors = require('cors');
require('dotenv').config()
const cookieParser = require('cookie-parser')

const dbOperations = require('../database/operations');

import { Request, Response } from 'express';
import { JWT, JWTAgeString, JWTAgeNumber } from './classes/JWT'

const API_PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true }));
app.use(cookieParser())

app.post('/create', async (req: Request, res: Response) => {
    await dbOperations.createUser(req.body);
    const result = await dbOperations.getUser(req.body.firstName)
    res.send(result.recordset)
})

app.post('/login', async (req: Request, res: Response) => {
    const inputEmail = req.body.email
    const inputPassword = req.body.password

    const result = await dbOperations.getUser(inputEmail)
    const user = result.recordset[0]

    const match = await argon2.verify(user.Password, inputPassword)

    if (match) {        
        const accessToken = new JWT(user.Email, JWTAgeString.access, JWTAgeNumber.access)
        const refreshToken = new JWT(user.Email, JWTAgeString.refresh, JWTAgeNumber.refresh)

        accessToken.storeInCookie(res, "accessToken")
        refreshToken.storeInCookie(res, "refreshToken")
    } else {
        return res.status(401).send("Invalid Email or Password")
    }

    res.send({ message: "Login Success" })
})

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
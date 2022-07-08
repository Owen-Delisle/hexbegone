import express from 'express';

const app = express();
const argon2 = require('argon2');
const cors = require('cors');
require('dotenv').config()
const cookieParser = require('cookie-parser')

const dbOperations = require('../database/operations');

import { Request, Response } from 'express';

import { AccessJWT } from "./classes/JWTClasses/AccessJWT"
import { JWT } from './classes/JWTClasses/JWT';
import { RefreshJWT } from "./classes/JWTClasses/RefreshJWT"

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
    const { Email, Password } = user
    const match = await argon2.verify(Password, inputPassword)

    if (match) {
        const accessToken = new AccessJWT(Email)
        const refreshToken = new RefreshJWT(Email)

        accessToken.storeInCookie(res, AccessJWT.title)
        refreshToken.storeInCookie(res, RefreshJWT.title)

        const tokenPayload = refreshToken.verifiedPayload()
        dbOperations.storeRefreshToken(tokenPayload.jti, tokenPayload.exp)
    } else {
        return res.status(401).send("Invalid Email or Password")
    }

    res.send({ message: "Login Success" })
})

app.post('/refresh_token_from_db', async (req: Request, res: Response) => {
    const accessToken = req.cookies[AccessJWT.title]
    const refreshToken = req.cookies[RefreshJWT.title]

    if (accessToken != null) {
        res.send(true)
        return
    }

    if (refreshToken != null) {
        const refreshFromCookie = JWT.decodeEncodedToken(refreshToken)
        const refreshFromDB = await dbOperations.getRefreshTokenByJTI(refreshFromCookie.jti)

        if (refreshFromDB != null) {
            const expireTimeOfToken = refreshFromDB.recordset[0]['Expires']
            const secondsSinceEpoch = Math.round(new Date().getTime() / 1000)
            if (secondsSinceEpoch < expireTimeOfToken) {
                const newAccessToken = new AccessJWT(refreshFromCookie.sub)
                newAccessToken.storeInCookie(res, AccessJWT.title)
                res.send(true)
                return
            }
        }
    } else {
        res.send(false)
        return 
    }
})

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

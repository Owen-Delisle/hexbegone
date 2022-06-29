const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require("path")
import { Response } from 'express';

enum JWTFields {
    iss = "hexbegone.com",
    aud = "http://hexbegone.com",
    algo = "RS256"
}

interface IJWT {
    issuer: string;
    subject: string;
    audience: string;
    expiresInString: string;
    expiresInNumber: number;
    algorithm: string;
    privateKey: string;
    payload: object;
    signedToken: string;

}
class JWT implements IJWT {
    issuer: string = JWTFields.iss;
    audience: string = JWTFields.aud;
    algorithm: string = JWTFields.algo;
    privateKey: string = JWT.key("../../keys/private.key");
    publicKey: string = JWT.key("../../keys/public.key");
    subject: string;
    expiresInString: string;
    expiresInNumber: number;
    payload: object = {};
    signedToken: string;

    constructor(subject: string, expiresInString: string, expiresInNumber: number) {
        this.subject = subject;
        this.expiresInString = expiresInString;
        this.expiresInNumber = expiresInNumber;
        this.signedToken = this.generateSignedToken()
    }

    private static key(filePath: string): string {
        return fs.readFileSync(path.resolve(__dirname, filePath), "utf8");
    }

    private generateSignedToken(): string {
        const signOptions: object = {
            issuer: this.issuer,
            subject: this.subject,
            audience: this.audience,
            expiresIn: this.expiresInString,
            algorithm: this.algorithm,
        }

        return jwt.sign(this.payload, this.privateKey, signOptions)
    }

    public storeInCookie(res: Response, name: string): void {
        res.cookie(name, this.signedToken, {
            maxAge: this.expiresInNumber,
            httpOnly: true
        })
    }
};

export { JWT };
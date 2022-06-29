const jwt = require('jsonwebtoken')

enum JWTFields {
    iss = "hexbegone.com",
    aud = "http://hexbegone.com",
    algo = "RS256"
}

interface IJWT {
    issuer: string;
    subject: string;
    audience: string;
    expiresIn: string;
    algorithm: string;
    privateKey: string;
    payload: object;

}
class JWT implements IJWT {
    issuer: string = JWTFields.iss;
    audience: string = JWTFields.aud;
    algorithm: string = JWTFields.algo;
    subject: string;
    expiresIn: string;
    privateKey: string;
    publicKey: string;
    payload: object = {};

    constructor(subject: string, expiresIn: string, privatekey: string, publicKey: string) {
        this.subject = subject;
        this.expiresIn = expiresIn;
        this.privateKey = privatekey;
        this.publicKey = publicKey;
    }

    public generateToken(): string {
        const signOptions: object = {
            issuer: this.issuer,
            subject: this.subject,
            audience: this.audience,
            expiresIn: this.expiresIn,
            algorithm: this.algorithm,
        }

        return jwt.sign(this.payload, this.privateKey, signOptions)
    }
};

export { JWT };
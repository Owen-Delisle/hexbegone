const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require("path")

const privateKey = fs.readFileSync(path.resolve(__dirname, "../keys/private.key"), "utf8")
const publicKey = fs.readFileSync(path.resolve(__dirname, "../keys/public.key"), "utf8")

function testToken() {

    payload = {}

    const iss = "hexbegone.com"
    const sub = "test@user.ca"
    const aud = "http://hexbegone.com"

    const exp = "24h"

    const signOptions = {
        issuer: iss,
        subject: sub,
        audience: aud,
        expiresIn: exp,
        algorithm: "RS256"
    }

    console.log("Options: ", JSON.stringify(signOptions));

    const token = jwt.sign(payload, privateKey, signOptions)
    console.log("Token:", token);

    const verifyOptions = {
        issuer: iss,
        subject: sub,
        audience: aud,
        maxAge: exp,
        algorithms: ["RS256"]
    }

    const verified = jwt.verify(token, publicKey, verifyOptions)
    console.log("Verified:", JSON.stringify(verified));

    const decoded = jwt.decode(token, {complete: true})
    console.log("Decoded Header:", JSON.stringify(decoded.header));
    console.log("Decoded Payload:", JSON.stringify(decoded.payload));
}

function generateToken(user, lifespan) {
    payload = {}

    const signOptions = {
        issuer: "hexbegone.com",
        subject: user.Email,
        audience: "http://hexbegone.com",
        expiresIn: lifespan,
        algorithm: "RS256"
    }

    return jwt.sign(payload, privateKey, signOptions)
}

module.exports = {
    generateToken
}
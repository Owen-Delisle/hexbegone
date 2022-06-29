function storeTokenInCookie(res, name, token) {
    res.cookie(name, token, {
        maxAge: 30000, // 5 sec
        httpOnly: true
    })
}

module.exports = {
    storeTokenInCookie
}
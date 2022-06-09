function storeTokenInCookie(res, token) {
    res.cookie('accessToken', token, {
        maxAge: 30000, // 5 sec
        httpOnly: true
    })
}

module.exports = {
    storeTokenInCookie
}
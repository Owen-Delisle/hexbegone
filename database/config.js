const config = {
    user: 'testLogin1',
    password: 'th1s1sAVeryStrongPassword',
    server: 'localhost',
    database: 'HexBeGone',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true
        },
    port: 1433
}

module.exports = config;
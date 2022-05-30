const User = require('./database/user/User');

const   express = require('express'),
        dbOperations = require('./database/operations')
        cors = require('cors');

// const API_PORT = process.env.PORT || 6000;
// const app = express();

// app.use(cors());

// app.get('/api', function(req, res) {
//     console.log('Called');
//     res.send({result: 'Helllo'})
// })

// app.get('/quit', function(req, res) {
//     console.log('Called quit');
//     res.send({result: 'Goodbye'})
// })

const rick = new User(2, 'rick', 'sanchez', 'test');

// dbOperations.createUser(rick)

dbOperations.getUsers().then(res => {
    console.log(res);
})

// app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

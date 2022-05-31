const   express = require('express'),
        dbOperations = require('./database/operations')
        cors = require('cors');

const API_PORT = process.env.PORT || 4000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/api', async(req, res) => {
    console.log('Called');
    const result = await dbOperations.getUser(req.body.name)
    res.send(result.recordset)
})

app.post('/create', async(req, res) => {
    console.log("create called");
    await dbOperations.createUser(req.body);
    console.log("REQQ:", req.body)
    const result = await dbOperations.getUser(req.body.firstName)
    res.send(result.recordset)
})

// const rick = new User(2, 'rick', 'sanchez', 'test');

// dbOperations.createUser(rick)

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

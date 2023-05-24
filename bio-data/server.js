const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:8080'
};

app.use(cors(corsOptions));

// parse request of content-type (json/application)
app.use(express.json());

// parse request of content-type (application/x-www-form-urlencoded)
app.use(express.urlencoded({
    extended: true
}));

const db = require('./app/models');
db.biodataConnection.sync()
    .then(() => {
        console.log('Synced database.');
    })
    .catch((err) => {
        console.log('Failed to synchronize database: ' + err.message);
    });

// import profile route
const profileController = require('./app/controllers/bio.controller');

// create profile route
app.post('/', (req, res) => {
    profileController.create(req, res);
});

// find all profile route
app.get('/', (req, res) => {
    profileController.findAll(req, res);
});

// find profile by id route
app.get('/:id', (req, res) => {
    profileController.findOne(req, res);
});

// delete profile by id route
app.delete('/:id', (req, resp) => {
    profileController.delete(req, resp);
});

// update profile by id route
app.put('/:id', (req, res) => {
    profileController.update(req, res);
});

// patch profile by id route
app.patch('/:id', (req, res) => {
    profileController.patch(req, res);
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
const db = require('../models');

const Profile = db.profile;
const Op = db.Sequelize.Op;

// create profile method
exports.create = (req, res) => {
    // validate request
    if (!req.body.nama) {
        res.status(400).send({
            message: 'Name can not be empty!'
        });
        return;
    };

    if (!req.body.tempat_lahir) {
        res.status(400).send({
            message: 'Place of born can not be empty!'
        });
        return;
    };

    if (!req.body.tanggal_lahir) {
        res.status(400).send({
            message: 'Date of birth can not be empty!'
        });
        return;
    };

    if (!req.body.alamat) {
        res.status(400).send({
            message: 'Address can not be empty!'
        });
        return;
    };

    // create profile object
    const profile = {
        nama: req.body.nama,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
    };

    // save profile to database
    Profile.create(profile)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error occured while inserting profile.'
            })
        })
};

// find all profile
exports.findAll = (req, res) => {
    Profile.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while retrieving profile.'
            });
        });
};

// find single profile with id
exports.findOne = (req, res) => {
    Profile.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while finding profile.'
            });
        });
};

// delete profile with id
exports.delete = (req, res) => {
    Profile.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(
            res.send({
                message: `Success delete book with id = ${req.params.id}`
            })
        )
        .catch(err => {
            res.status(500).send({
                message: `Could not delete profile with id ${req.params.id}`
            });
        });
};

// update profile with id
exports.update = (req, res) => {
    if (!req.body.nama) {
        res.status(400).send({
            message: 'Name can not be empty!'
        });
        return;
    };

    if (!req.body.tempat_lahir) {
        res.status(400).send({
            message: 'Place of born can not be empty!'
        });
        return;
    };

    if (!req.body.tanggal_lahir) {
        res.status(400).send({
            message: 'Date of birth not be empty!'
        });
        return;
    };

    if (!req.body.alamat) {
        res.status(400).send({
            message: 'Address can not be empty!'
        });
        return;
    };

    Profile.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            data.nama = req.body.nama;
            data.tempat_lahir = req.body.tempat_lahir;
            data.tanggal_lahir = req.body.tanggal_lahir;
            data.alamat = req.body.alamat;
            data.save();

            res.send({
                message: 'Update profile successfully.'
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while finding profile.'
            });
        });
};

// patch profile with id
exports.patch = (req, res) => {
    Profile.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (!req.body.nama) {
                data.nama = req.body.nama;
            };

            if (!req.body.tempat_lahir) {
                data.tempat_lahir = req.body.tempat_lahir;
            };

            if (!req.body.tanggal_lahir) {
                data.tanggal_lahir = req.body.tanggal_lahir;
            };

            if (!req.body.alamat) {
                data.alamat = req.body.alamat;
            };

            data.save();
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while finding profile.'
            });
        });
};

// find an profile with data name
exports.findProfileName = (req, res) => {
    db.biodataConnection.query('SELECT * FROM profile WHERE name = ?', {
        replacements: [req.params.nama]
    })
        .then(data => {
            req.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while finding profile.'
            });
        });
};

// find an profile with data id
exports.findProfileId = (req, res) => {
    db.biodataConnection.query(`SELECT * FROM profile WHERE id = id`, {
        replacements: [req.params.nama]
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while finding profile.'
            });
        });
};
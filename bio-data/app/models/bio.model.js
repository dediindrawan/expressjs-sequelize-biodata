module.exports = (biodataConnection, Sequelize) => {
    const Profile = biodataConnection.define('profiles', {
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tempat_lahir: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tanggal_lahir: {
            type: Sequelize.DATEONLY,
        },
        alamat: {
            type: Sequelize.STRING,
        }
    });

    return Profile;
};
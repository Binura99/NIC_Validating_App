module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define ("Users",{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
});

// Users.associate =(models) => {
//     Users.hasMany(models.Reservations, {
//         onDelete: "cascade",
//     });
// }

return Users;
};
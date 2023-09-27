const { Users } = require("../models");
const bcrypt = require("bcrypt");

const {sign} = require('jsonwebtoken')

const register = async ( req, res ) => {
    const {username, password, name, address, nic, number} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            name: name,
            address: address,
            nic: nic,
            number: number,
        });
    res.json("Successfully User Registered");
    });
}

const getUsers = async ( req, res ) => {
    const listOfusers = await Users.findAll();
    res.json(listOfusers);
}

const getUser = async ( req, res ) => {
    const userId = req.params.id;
    const user = await Users.findByPk(userId);
    res.json(user);
}

const loginUser = async ( req, res ) => {
    const { username, password } = req.body;
    const userA = await Users.findOne({ where: { username: username} });

    if (!userA) {
        res.json({ error: "User Doesn't Exist" });
        return;
    }

    bcrypt.compare(password, userA.password).then((match) => {
        if (!match) {
        res.json({ error: "Wrong Username Password Combination" });
        return;
    }
        // if(match) {
        //     res.json("Valid User")
        //     return;
        // }
        const accessToken = sign({username: userA.username, id: userA.id, name: userA.name},
            "importantsecret");
            res.json(accessToken);
});
}

const deleteUser = async ( req, res ) => {
    const userId = req.params.id;
    await Users.destroy({where: {id:userId}});
    res.json("Deleted User");
}

const editUser = async ( req, res ) => {
    const userId = req.params.id;
    const data = req.body;
    await Users.update(data, {where: { id: userId}});
    res.json("Updated Account");
}

module.exports = {
    register,
    getUsers,
    loginUser,
    deleteUser,
    editUser,
    getUser,
}
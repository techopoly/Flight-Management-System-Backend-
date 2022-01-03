const { validationResult } = require('express-validator/check');

const user_M = require('../model/user_M');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')






const createUserController = async (req, res, next) => {

    console.log(req.body.username);
    username = req.body.username;
    email = req.body.email;
    password = req.body.password
    bcrypt.hash(password, 12).then(async (hashedPass) => {
        const user = new user_M.User(username, email, hashedPass);
        const result = await user.createUser();
        res.status(200).json({
            message: 'user created',
            data: result
        })
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            message: 'something wrong'
        })
    })
}

const loginController = async (req, res, next) => {

    console.log(req.body.email);
    email = req.body.email;
    password = req.body.password;
    const user = await user_M.User.findByEmail(email);
    console.log(user[0]);
    console.log(user[0].password);
    const pass = user[0].password
    return bcrypt.compare(password, pass)
        .then(boolean => {
            if (!boolean) {
                console.log(boolean)
                return res.status(200).json({
                    message: 'wrong password'
                })
            } else {
                const token = jwt.sign({
                    email: email,
                    username: user[0].username
                },
                    'privatekey',
                    { expiresIn: '1h' })
                res.status(200).json({
                    message: 'login successful',
                    token: token,
                    username : user[0].username
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                message: 'something wrong'
            })
        })
}


exports.createUserController = createUserController
exports.loginController = loginController;
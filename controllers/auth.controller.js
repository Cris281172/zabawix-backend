require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/User')
const {sendHTMLEmail} =  require('../config/email')
const getCurrentDate = require('../utils/getCurrentDate')
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
module.exports = class Auth{
    static generateEmailToken = async () => {
        const arrayOfSymbols = '1234567890'.split('')

        let randomEmailToken = [];

        for(let i = 1; i<=6; i++){
            randomEmailToken.push(arrayOfSymbols[Math.floor(Math.random() * arrayOfSymbols.length)])
        }

        randomEmailToken = Number(randomEmailToken.join(''));

        const checkToken = await User.findOne({
            emailToken: {
                $eq: randomEmailToken
            }
        })
        if(checkToken){
            return Auth.generateEmailToken();
        }

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 1);

        return { token: randomEmailToken, expires };

    }
    static login = async (req, res) => {
        try{
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(400).json({error: 'All fields are required'})
            }

            const user = await User.findOne({
                email: {
                    $eq: email
                },
                googleID: {
                    $exists: false
                }
            })

            if(!user){
                return res.status(400).send('Invalid password or email');
            }
            if(!await bcrypt.compare(password, user.password)){
                return res.status(400).send('Invalid password or email');
            }
            if(user.emailVerifiedAt === null){
                return res.status(200).send(user)
            }
            const token = jwt.sign(
                {
                    user_id: user._id,
                    email: user.email,
                    accountType: user.accountType
                },
                process.env.JWT_TOKEN,
                {
                    expiresIn: '1h'
                }
            )
            await User.updateOne({
                _id: user._id
            }, {
                token: token
            })
            user.token = token;
            return res.status(200).send(user);
        }
        catch(err){
            res.status(500).send({error: err})
        }
    }
    static loginByGoogle = async (req, res) => {
        const {email, googleID} = req.body;
        if(!email || !googleID){
            return res.status(400).send('All fields require');
        }
        let user = await User.findOne({
            googleID: googleID,
            email: email
        });

        if(!user){
            user = await User.create({
                email: email.toLowerCase(),
                accountType: 'user',
                points: 500,
                googleID: googleID
            })
            await user.save()
        }


        const token = jwt.sign(
            {
                user_id: user._id,
                email: user.email,
            },
            process.env.JWT_TOKEN,
            {
                expiresIn: '1h'
            }
        )
        await User.updateOne({
            _id: user._id
        }, {
            token: token
        })
        user.token = token;
        return res.status(200).send(user);
    }
    static register = async (req,res) => {
        try{
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(400).send('All fields are required')
            }

            const checkEmailExist = await User.findOne({
                email: {
                    $eq: email
                },
                googleID: {
                    $exists: false
                }
            })

            if(checkEmailExist){
                return res.status(409).send('Email already exists')
            }

            const bcryptPassword = await bcrypt.hash(password, 12)
            const { token: emailToken,  expires: emailTokenExpires } = await Auth.generateEmailToken();

            const user = await User.create({
                email: email.toLowerCase(),
                password: bcryptPassword,
                emailVerifiedAt: null,
                emailToken: emailToken,
                emailTokenExpires: emailTokenExpires,
                accountType: 'user',
                points: 500,
            })

            const locals = {
                token: emailToken,
                host: process.env.HOST,
                port: process.env.FRONTEND_PORT
            };

            const options = {
                from: "zabawix@gmail.com",
                to: email,
            }


            sendHTMLEmail(options, locals, 'active-account');
            return res.status(201).send({expires: user.emailTokenExpires, email: user.email})

        }
        catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    }
    static verifyEmail = async (req, res) => {
        try{
            const {emailToken} = req.body;
            const userWithEmailToken = await User.findOne({
                emailToken: {
                    $eq: emailToken,
                },
                emailTokenExpires: { $gte: new Date() }
            })
            if (!userWithEmailToken) {
                return res.status(404).send('Invalid or expired email token');
            }
            if(userWithEmailToken){
                const token = jwt.sign(
                    {
                        user_id: userWithEmailToken._id,
                        email: userWithEmailToken.email,
                    },
                    process.env.JWT_TOKEN,
                    {
                        expiresIn: '1h'
                    }
                )
                await User.updateOne({
                    _id: userWithEmailToken._id
                }, {
                    $set: {
                        emailVerifiedAt: getCurrentDate,
                        token: token
                    },
                    $unset: {
                        emailToken: "",
                        emailTokenExpires: ""
                    }
                });

                const options = {
                    from: "zabawix.kontakt@gmail.com",
                    to: userWithEmailToken.email,
                }


                await sendHTMLEmail(options, '', 'register');
                return res.status(200).send({...userWithEmailToken, emailVerifiedAt: getCurrentDate, token: token});
            }
            return res.status(404).send('Invalid email token')
        }
        catch(err){
            res.status(500).send({error: err})
        }
    }
    static refreshToken = async (req, res) => {
        try{
            const currentToken = req.body.token;
            const userWithToken = await User.findOne({
                token: {
                    $eq: currentToken
                }
            })
            const token = jwt.sign(
                {
                    user_id: userWithToken._id,
                    email: userWithToken.email,
                },
                process.env.JWT_TOKEN,
                {
                    expiresIn: '1h'
                }
            )
            await User.updateOne({
                _id: userWithToken._id
            }, {
                token: token
            })
            userWithToken.token = token;
            return res.status(200).send(userWithToken);
        }
        catch(err){
            res.status(500).send({error: err});
        }
    }
    static checkLogin = async (req, res) => {
        try{
            const userToken = req.headers.authorization;

            const userWithToken = await User.findOne({
                token: {
                    $eq: userToken
                }
            })
            if(!userWithToken || userWithToken.emailVerifiedAt === null){
                return res.status(200).send({type: 'quest'})
            }
            const user = {
                email: userWithToken.email,
                id: userWithToken.id,
                points: userWithToken.points
            }
            return res.status(200).send({type: 'user', user: user})
        }
        catch(err){
            res.status(500).send({error: err})
        }
    }
    static changePassword = async (req, res) => {
        try{
            const {email, oldPassword, newPassword} = req.body;

            if(!email || !oldPassword || !newPassword){
                return res.status(400).json({error: 'All fields are required'})
            }

            const user = await User.findOne({
                email: {
                    $eq: email
                }
            })

            if(!user){
                return res.status(400).send('User not found');
            }

            if(!await bcrypt.compare(oldPassword, user.password)){
                return res.status(400).send('Email or password is invalid');
            }

            const bcryptPassword = await bcrypt.hash(newPassword, 12)

            user.password = bcryptPassword;
            user.save();
            return res.status(200).send(user);


        }
        catch(err){
            res.status(500).send({error: err})
        }
    }
    static logout = async (req, res) => {
        try {
            const userToken = req.body.token;
            const user = await User.findOne({ token: userToken });

            if (user) {
                await User.updateOne({ _id: user._id }, { $unset: { token: "" } });
            }
            res.status(200).send({ message: 'Successfully logged out' });
        } catch (err) {
            res.status(500).send({ error: 'An error occurred during logout' });
        }
    }
    static resendVerifyCode = async (req, res) => {
        try{
            const {email} = req.body;
            const user = await User.findOne({ email: email});
            if(!user){
                return res.status(404).send('User not found');
            }
            const { token: emailToken,  expires: emailTokenExpires } = await Auth.generateEmailToken();
            user.emailToken = emailToken
            user.emailTokenExpires = emailTokenExpires
            user.save();
            const locals = {
                token: emailToken,
                host: process.env.HOST,
                port: process.env.FRONTEND_PORT
            };

            const options = {
                from: "zabawix@gmail.com",
                to: email,
            }

            sendHTMLEmail(options, locals, 'active-account');
            res.status(200).send({expires: user.emailTokenExpires})
        }
        catch(err){
            res.status(500).send({error: err});
        }
    }
    static forgot = async (req, res) => {
        try{
            const {email} = req.body;
            if(!email){
                return res.status(400).send('Email is required')
            }
            const user = await User.findOne({ email: email});
            if(!user){
                return res.status(404).send('User not found')
            }
            const { token: emailToken,  expires: emailTokenExpires } = await Auth.generateEmailToken();
            user.forgotToken = emailToken
            user.forgotTokenExpires = emailTokenExpires;
            user.save();
            const locals = {
                token: emailToken,
                host: process.env.HOST,
                port: process.env.FRONTEND_PORT
            };
            const options = {
                from: "zabawix@gmail.com",
                to: email,
            }
            sendHTMLEmail(options, locals, 'reset-password');
            res.status(200).send({})
        }
        catch(err){
            res.status(500).send({error: err})
        }
    }
    static forgotVerify = async (req, res) => {
        const {forgotToken, email} = req.body;
        const userWithForgotToken = await User.findOne({
            email: email,
            forgotToken: {
                $eq: forgotToken,
            },
            forgotTokenExpires: { $gte: new Date() }
        })
        if (!userWithForgotToken) {
            return res.status(404).send('Invalid or expired email token');
        }
        return res.status(200).send(userWithForgotToken);
    }
    static newPassword = async (req, res) => {

    }
}
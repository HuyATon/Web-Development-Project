const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const APIError = require('../errors/API.js')
const statusCode = require('../constants/statusCode.js')
const jwt = require('jsonwebtoken')
const blackListConfig= require('../configs/jwtBlackListConfig.js')
const axios = require('axios')
const https = require('https')

async function createPaymentAccount(userID) {
    const dest = process.env.PAYMENT_BASE_URL + '/account'
    const agent = new https.Agent({
        rejectUnauthorized: false
    })
    await axios.post(dest, { id: userID}, { httpsAgent: agent })
}

module.exports = {

    register: async (req, res, next) => {
        try {
            const { username, password, email, name } = req.body
            const storedUser = await User.findOne({ username: username})

            if (storedUser) {
                const err = new APIError(statusCode.CONFLICT, 'Username already exists.')
                return next(err)
            }
            bcrypt.hash(password, 10, async (err, hashedPw) => {
                if (err) {
                    return next(err)
                }
                const user = new User({
                    username: username,
                    password: hashedPw,
                    email: email,
                    name: name
                })
                await user.save()
                await createPaymentAccount(user._id)
                res.status(statusCode.CREATED).json({
                    success: true,
                    message: 'User created successfully.'
                })
            })
            
        }
        catch (err) { next(err) }
    },
    login: async (req, res, next ) => {
        try {
            const { username, password } = req.body
            const storedUser = await User.findOne({ username: username})
            
            if (!storedUser) {
                const err = new APIError(statusCode.NOT_FOUND, 'Username is not found.')
                return next(err)
            }
            if (storedUser.googleID) {
                const err = new APIError(statusCode.UNAUTHORIZED, 'User is registered with Google.')
                return next(err)
            }
            const match = await bcrypt.compare(password, storedUser.password)
            if (!match) {
                const err = new APIError(statusCode.UNAUTHORIZED, 'Password is incorrect.')
                return next(err)
            }

            const payload = { 
                id: storedUser._id, 
                username: storedUser.username, 
                role: storedUser.role 
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(statusCode.OK).json({
                success: true,
                message: 'User logged in successfully.',
                token: token
            })
        }
        catch (err) { next(err) }
    },
    logout: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            blackListConfig.addToBlackList(token)
            res.status(statusCode.OK).json({
                success: true,
                message: 'User logged out successfully.'
            })
        }
        catch (err) { next(err) }
    },
    getMe: async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id)
            res.json({
                success: true,
                user: user
            })
        }
        catch (err) { next(err) }
    },

    updateUser: async (req, res, next) => {
        try {
            const userId = req.user._id;
            const { name, address, phone } = req.body;

            if (!name && !address && !phone) {
                const err = new APIError(statusCode.BAD_REQUEST, 'No data to update.');
                return next(err);
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        name: name || undefined,
                        address: address || undefined,
                        phone: phone || undefined,
                    }
                },
                { new: true }  
            );

            if (!updatedUser) {
                const err = new APIError(statusCode.NOT_FOUND, 'User not found.');
                return next(err);
            }

            res.status(statusCode.OK).json({
                success: true,
                message: 'User details updated successfully.',
                user: updatedUser,
            });
        } catch (err) {
            next(err);
        }
    }
}
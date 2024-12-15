const APIError = require("../errors/API.js")

const blackListConfig = require('../configs/jwtBlackListConfig.js')

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    console.log(blackListConfig.blackList)
    if (blackListConfig.blackList.has(token)) {
        const err = new APIError(401, 'Token is blacklisted.')
        return next(err)
    }
    next()
}
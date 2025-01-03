const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const header = req.headers['authorization']
    if (!header) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    try {
        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}
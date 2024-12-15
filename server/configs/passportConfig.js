const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User.js')
const passport = require('passport')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

module.exports = app => {

    app.use(passport.initialize())

    passport.use(new JwtStrategy(opts, async (jwt_payload, cb) => {
        try {
            console.log('foo')
            console.log(jwt_payload)
            const user = await User.findOne({ _id: jwt_payload.id })
            if (!user) { return cb(null, false) }

            return cb(null, user)
        }
        catch (err) { cb(err, false)}
    }))
}
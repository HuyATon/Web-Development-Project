const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('../models/User.js')
const passport = require('passport')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

module.exports = app => {

    app.use(passport.initialize())

    passport.use(new JwtStrategy(opts, async (jwt_payload, cb) => {
        try {
            const user = await User.findOne({ _id: jwt_payload.id })
            if (!user) { return cb(null, false) }

            return cb(null, user)
        }
        catch (err) { cb(err, false)}
    }))

    passport.use(new GoogleStrategy({
        clientID: process.env.GG_CLIENT_ID,
        clientSecret: process.env.GG_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
        passReqToCallback: true
    }, async (request, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleID: profile.id })
            if (!user) {
                user = await User.create({
                    username: profile.email,
                    email: profile.email,
                    name: profile.displayName,
                    role: 'user',
                    googleID: profile.id,
                })
            }
            return done(null, user)
        }
        catch (err) { return done(err) }
    }))
}
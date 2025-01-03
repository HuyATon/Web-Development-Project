const User = require('../models/User.js')

module.exports = async() => {
    try {
        const oldRoot = await User.findOne({ username: 'root' })

        if (oldRoot) {
            console.log('Root user already exists')
            return 
        }
        const root = new User({
            username: 'root',
            password: 'root',
            email: 'root@payment.com',
            name: 'Root',
        })
        await root.save()
        console.log('Root user created')
    }
    catch (err) {
        console.log(err.message)
    }
}
const PaymentAccount = require('../models/PaymentAccount.js')

module.exports = {

    createAccount: async (req, res) => {
        try {
            const userID = req.body.id
            const oldAccount = await PaymentAccount.findOne( { user: userID} )
            if (oldAccount) {
                return res.json({
                    success: false,
                    message: 'Account already exists'
                })
            }
            const account = PaymentAccount({
                user: userID,
                balance: 100 //
            })
            await account.save()
            res.json({
                success: true,
                message: 'Payment account created'
            })
        }
        catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    }
}
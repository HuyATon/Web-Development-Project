const PaymentAccount = require('../models/PaymentAccount.js')

module.exports = {
    handlePayment: async (req, res) => {
        try {
            const userID = req.user.id
            const amount = req.body.amount 
            const account = await PaymentAccount.findOne({ user: userID })
            console.log(amount)
            console.log(account)
            if (!account) {
                return res.status(404).json({
                    success: false,
                    message: 'Account not found'
                })
            }
            if (account.balance < amount) {
                return res.json({
                    success: false,
                    message: 'Not enough balance'
                })
            }
            account.balance -= amount
            await account.save()
            return res.json({
                success: true,
                message: 'Payment success'
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
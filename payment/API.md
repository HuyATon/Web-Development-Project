# Payment System API

When payment system run, it will create a root user who is responsible for receiving money

POST `/account`: create a new payment accounts based on `id` of user in `body`

POST `/payment`: process payment logic with `amount` passed in body

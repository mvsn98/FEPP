const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authEdit = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        if(user.name === req.body.currentName){
            req.user = user
            next()
        } else {
            try {
                const userToEdit = await User.findOne({ name: req.body.currentName })
                if(userToEdit){
                    req.user = userToEdit;
                    next()
                } else {
                    throw new Error()
                }
            } catch(e){
                res.send({error: 'Requested User was NOT found!'});
            }
        }
    } catch (e) {
        res.send({error: 'Please Authenticate!'});
    }
}

module.exports = authEdit
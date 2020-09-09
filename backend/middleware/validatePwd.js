const passwordSchema = require('../models/password')

module.exports = (req, res, next) => {
    try {
        if (!passwordSchema.validate(req.body.user.password)) {
            throw 'Le mot de passe n\'est pas valide'
        } else {
            next()
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        })
    }
}
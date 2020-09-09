const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const validatePwd = require('../middleware/validatePwd')

router.post('/signup', validatePwd, userCtrl.signup)
router.get('/', userCtrl.getAllUser)
router.get('/:id', userCtrl.getOneUser)
router.post('/login', userCtrl.login)
router.put('/:id', userCtrl.modifyUser)
router.delete('/:id', userCtrl.deleteUser)

module.exports = router
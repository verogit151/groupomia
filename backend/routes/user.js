const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)
router.get('/', userCtrl.getAllUser)
router.get('/:id', userCtrl.getOneUser)
router.post('/login', userCtrl.login)
router.put('/:id', userCtrl.modifyUser)
router.delete('/:id', userCtrl.deleteUser)

// router.delete('/:id', userCtrl.deleteUser);

module.exports = router
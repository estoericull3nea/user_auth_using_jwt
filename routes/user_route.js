const router = require('express').Router()
const {
  postRegister,
  postLogin,
  postLogout,
} = require('../controllers/user_controller')

router.post('/register', postRegister)
router.post('/login', postLogin)
router.post('/logout', postLogout)

module.exports = router

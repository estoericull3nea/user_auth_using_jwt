const router = require('express').Router()
const { validate_token } = require('../config/jwt')
const { getProfile, getHomepage } = require('../controllers/index_controller')

router.get('/', getHomepage)
router.get('/profile', validate_token, getProfile)

module.exports = router

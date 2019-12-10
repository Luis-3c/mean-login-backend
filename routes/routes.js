const express = require('express');
const router = express.Router();
const usersController = require('../auth/auth-controller');


router.get('/', (req, res) => {
    res.send('welcome to home route')
});

// Auth routes
router.post('/register', usersController.createUser);

router.post('/login', usersController.loginUser);

router.post('/verify', usersController.validarToken);

module.exports = router;
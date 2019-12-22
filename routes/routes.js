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

router.post('/profile', usersController.validarToken, (req, res)=>{
    res.json({'response': 'my profile'})
});

module.exports = router;
const express = require('express');
const {
    login,
    register,
    forgotPassword,
    resetPassword
} = require('../controllers/auth.controller.js');

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);

module.exports = router;

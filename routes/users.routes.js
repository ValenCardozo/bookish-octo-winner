const express = require('express');
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateUserRole } = require('../controllers/users.controller.js');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();
router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserById);
router.post('/', verifyToken, isAdmin, createUser);
router.put('/:id', verifyToken, isAdmin, updateUser);
router.delete('/:id', verifyToken, isAdmin, deleteUser);
router.patch('/:id/role', verifyToken, isAdmin, updateUserRole);

module.exports = router;
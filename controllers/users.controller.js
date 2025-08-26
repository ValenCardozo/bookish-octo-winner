const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../db/users.json');

const db = require('../db/db.js'); // Assuming db.js is the database connection file

let users = [];
try {
  users = JSON.parse(fs.readFileSync(filePath, 'utf8')).users;
} catch (err) {
  console.error('Error loading users database:', err);
  fs.writeFileSync(filePath, JSON.stringify({ users: [] }, null, 2), 'utf8');
  users = [];
}

const saveUsers = () => {
  fs.writeFileSync(filePath, JSON.stringify({ users }, null, 2), 'utf8');
};

const generateUniqueId = () => {
  const ids = users.map(user => user.id);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return maxId + 1;
};

const getUsers = (req, res) => {
    res.json({ users: users, status: 200, message: 'Users fetched successfully' });
    console.log('Received request for users');
};

const getUserById = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json({ data: user, status: 200, message: 'User fetched successfully' });
    console.log(`Received request for user with id: ${userId}`);
  } else {
    res.status(404).json({ status: 404, message: 'User not found' });
    console.log(`User with id ${userId} not found`);
  }
};

const createUser = (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  if (!newUser.name || !newUser.name.trim()) {
    return res.status(400).json({status: 400, message: 'Name is required'});
  }

  if (!newUser.email || !newUser.email.trim()) {
    return res.status(400).json({status: 400, message: 'Email is required'});
  }

  if (!newUser.age || isNaN(newUser.age) || newUser.age <= 0) {
    return res.status(400).json({status: 400, message: 'Valid age is required'});
  }

  if (users.some(user => user.email === newUser.email.trim())) {
    return res.status(400).json({status: 400, message: 'Email already exists'});
  }

  const userToSave = {
    id: generateUniqueId(),
    name: newUser.name.trim(),
    email: newUser.email.trim(),
    age: parseInt(newUser.age, 10),
    ...newUser
  };

  users.push(userToSave);
  saveUsers();

  res.status(201).json({data: userToSave, status: 201, message: 'User created successfully'});
  console.log('Received request to create user:', userToSave);
};

const updateUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) {
    res.status(404).json({status: 404, message: 'User not found'});
    console.log(`User with id ${userId} not found`);
    return;
  }

  const updatedData = req.body;

  if (updatedData.email && updatedData.email !== user.email) {
    if (users.some(u => u.id !== userId && u.email === updatedData.email)) {
      return res.status(400).json({status: 400, message: 'Email already in use'});
    }
  }

  const updatedUser = { ...user, ...updatedData, id: userId };

  users = users.map(u => u.id === userId ? updatedUser : u);
  saveUsers();

  res.json({data: updatedUser, status: 200, message: 'User updated successfully'});
  console.log(`Received request to update user with id: ${userId}`);
};

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);

  if (!user) {
    res.status(404).json({status: 404, message: 'User not found'});
    console.log(`User with id ${userId} not found`);
    return;
  }

  users = users.filter(u => u.id !== userId);
  saveUsers();

  res.json({status: 200, message: 'User deleted successfully'});
  console.log(`Received request to delete user with id: ${userId}`);
};

const updateUserRole = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { role } = req.body;
  console.log(userId, role);

  if (!role) {
    return res.status(400).json({ status: 400, message: 'Role is required' });
  }

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ status: 404, message: 'User not found' });
  }

  user.role = role;
  saveUsers();

  res.json({ status: 200, message: 'User role updated successfully', data: user });
  console.log(`Updated role for user with id: ${userId}`);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole
};

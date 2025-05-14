const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../db/users.json');

let users = [];
try {
  users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (err) {
  // If file doesn't exist or has invalid JSON, use default array
  console.error('Error loading users database:', err);
  fs.writeFileSync(filePath, JSON.stringify([]), 'utf8');
  users = [];
}

// Helper function to save users to file
const saveUsers = () => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
};

// Helper function to generate a unique ID
const generateUniqueId = () => {
  const ids = users.map(user => user.id);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return maxId + 1;
};

const getUsers = (req, res) => {
    res.json({ data: users, status: 200, message: 'Users fetched successfully' });
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
  
  // Validate required fields
  if (!newUser.name || !newUser.name.trim()) {
    return res.status(400).json({status: 400, message: 'Name is required'});
  }
  
  if (!newUser.email || !newUser.email.trim()) {
    return res.status(400).json({status: 400, message: 'Email is required'});
  }
  
  if (!newUser.age || isNaN(newUser.age) || newUser.age <= 0) {
    return res.status(400).json({status: 400, message: 'Valid age is required'});
  }
  
  // Check for duplicate email
  if (users.some(user => user.email === newUser.email.trim())) {
    return res.status(400).json({status: 400, message: 'Email already exists'});
  }
  
  // Assign unique ID and clean data
  const userToSave = {
    id: generateUniqueId(),
    name: newUser.name.trim(),
    email: newUser.email.trim(),
    age: parseInt(newUser.age, 10),
    ...newUser
  };
  
  users.push(userToSave);
  saveUsers(); // Save to file
  
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
  
  // Check if trying to change email to one that already exists
  if (updatedData.email && updatedData.email !== user.email) {
    if (users.some(u => u.id !== userId && u.email === updatedData.email)) {
      return res.status(400).json({status: 400, message: 'Email already in use'});
    }
  }
  
  // Update user and maintain ID
  const updatedUser = { ...user, ...updatedData, id: userId };
  
  // Replace the user in the array using map
  users = users.map(u => u.id === userId ? updatedUser : u);
  saveUsers(); // Save to file
  
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
  
  // Filter out the user instead of using splice with findIndex
  users = users.filter(u => u.id !== userId);
  saveUsers(); // Save to file
  
  res.json({status: 200, message: 'User deleted successfully'});
  console.log(`Received request to delete user with id: ${userId}`);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

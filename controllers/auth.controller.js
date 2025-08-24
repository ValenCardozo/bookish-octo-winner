const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {users} = require('../models');
const register = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await users.create({
      name,
      email,
      age,
      password: hashedPassword,
      role: 'user',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const login = async (req, res) => {
    const { email, password } = req.body
    console.log('llego?', req.body);
    try {
        const userExist = await users.findOne({ where: { email } })
        console.log('userExist', userExist);
        if (!userExist) return res.status(400).json({ message: 'Usuario no encontrado' })

        const validPassword = await bcrypt.compare(password, userExist.password)
        if (!validPassword) return res.status(403).json({ message: 'Contraseña incorrecta' })

        const user = {
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            age: userExist.age,
            role: userExist.role,
            isActive: userExist.isActive,
            createdAt: userExist.createdAt,
            updatedAt: userExist.updatedAt
        }

        const token = jwt.sign({ user: user }, 'secreto123', { expiresIn: '1h' })

        res.json({ message: 'Inicio de sesion exitoso', token })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al loguear el usuario', error: error.message });
    }
}

module.exports = {
  register,
  login,
};
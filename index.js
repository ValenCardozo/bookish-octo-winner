const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./db/db.js');
const fs = require('fs');
const path = require('path');

const port = 3003;

app.use(cors());
app.use(express.json());

const productRouter = require('./routes/products.routes.js');
const userRouter = require('./routes/users.routes.js');

// Consolidar todos los modelos y sincronizarlos
const modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    require(path.join(modelsPath, file));
  });

sequelize.sync()
  .then(() => console.log('Todas las tablas sincronizadas'))
  .catch(err => console.error('Error al sincronizar tablas:', err));

app.use('/products', productRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
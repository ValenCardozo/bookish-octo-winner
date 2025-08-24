const express = require('express')
const cors = require('cors')
const app = express()

const port = 3003
app.use(cors())
app.use(express.json())

const productRouter = require('./routes/products.routes.js');
const userRouter = require('./routes/users.routes.js');
const salesRouter = require('./routes/sales.routes.js');
const authRouter = require('./routes/auth.routes.js');

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/sales', salesRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
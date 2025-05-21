const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../db/products.json');

let products = [];
try {
  products = JSON.parse(fs.readFileSync(filePath, 'utf8')).products;
} catch (err) {
  console.error('Error loading products database:', err);
  fs.writeFileSync(filePath, JSON.stringify([]), 'utf8');
  products = [];
}

const getProducts = (req, res) => {
    res.json({ products: products, status: 200, message: 'Products fetched successfully' });
    console.log('Received request for products');
};

const getProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json({ data: product, status: 200, message: 'Product fetched successfully' });
    console.log(`Received request for product with id: ${productId}`);
  } else {
    res.status(404).json({ status: 404, message: 'Product not found' });
    console.log(`Product with id ${productId} not found`);
  }
};

const createProduct = (req, res) => {
  const newProduct = req.body;
  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({status: 400, message: 'Invalid product data'});
  }

  const lastProduct = products[products.length - 1];
  newProduct.id = lastProduct ? lastProduct.id + 1 : 1;
  products.push(newProduct);
  res.status(201).json({data: newProduct, status: 201, message: 'Product created successfully'});
  console.log('Received request to create product:', newProduct);
};

const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    res.json({data: updatedProduct, status: 200, message: 'Product updated successfully'});
    console.log(`Received request to update product with id: ${productId}`);
  } else {
    res.status(404).json({status: 404, message: 'Product not found'});
    console.log(`Product with id ${productId} not found`);
  }
};

const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.json({status: 200, message: 'Product deleted successfully'});
    console.log(`Received request to delete product with id: ${productId}`);
  } else {
    res.status(404).json({status: 404, message: 'Product not found'});
    console.log(`Product with id ${productId} not found`);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

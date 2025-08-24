const {Sales, Product, Users} = require('../models')

const getSales = async (req, res) => {
    try {
        const sales = await Sales.findAll({
            include: [Users, Product]
        })
        res.json({status: 200, data: sales})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getSales
};
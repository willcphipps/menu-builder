const Users = require('../controllers/users.controller')
const { authenticate } = require('../config/jwt.config')
const ProductController = require('../controllers/products.controller')
const IngredientController = require('../controllers/ingredients.controller')
const addedProductsController=require('../controllers/addedProducts.controller')
const OrderController = require('../controllers/orders.controller')
const stripe = require('stripe')('your_api_key_here')


module.exports = app => {
    app.post('/api/register', Users.register)
    app.post('/api/login', Users.login)
    app.get('/api/users/:id', Users.getOne)

    app.get('/api/products', ProductController.getAll)
    app.post('/api/products', ProductController.createOne)
    app.get('/api/products/:id', ProductController.getOne)
    app.put('/api/products/:id', ProductController.updateOne)
    // app.delete('/api/products/:id', ProductController.deleteOne)
    
    app.get('/api/orders', OrderController.getAll)
    app.post('/api/orders', OrderController.createOne)
    app.get('/api/orders/:id', OrderController.getOne)
    app.put('/api/orders/:id', OrderController.updateOne)
    app.delete('/api/orders/:id', OrderController.deleteOne)

    app.get('/api/addedProducts', addedProductsController.getAll)
    app.post('/api/addedProducts', addedProductsController.createOne)
    app.get('/api/addedProducts/:id', addedProductsController.getOne)
    app.put('/api/addedProducts/:id', addedProductsController.updateOne)
    app.delete('/api/addedProducts/:id', addedProductsController.deleteOne)

    app.get('/api/ingredients', IngredientController.getAll)
    app.post('/api/ingredients', IngredientController.createOne)
    app.get('/api/ingredients/:id', IngredientController.getOne)
    app.put('/api/ingredients/:id', IngredientController.updateOne)
    app.delete('/api/ingredients/:id', IngredientController.deleteOne)



    app.post('/checkout', (req, res) => {

        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,

        })
            .then(customer => stripe.charges.create({
                amount: req.body.amount,
                name: 'Thank you',
                currency: 'usd',
                customer: req.body.id
            }))
            .then(charge => res.render('success'))
            .catch(err=>res.json(err))
    })
}

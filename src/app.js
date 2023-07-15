const express = require('express')
const app = express();
app.use(express.json())
const port = 8080


app.use(express.json());

class Product {
    id
    title
    description
    price
    thumbnail
    code
    stock
    category
    status

    constructor(title, description, price, thumbnail = null, code, stock, category, status = true) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.category = category;
        this.status = status;
    }
}

class Cart {
    id
    products

    constructor(products) {
        this.products = products;
    }
}

const productManager = new ProductManager('../resources/products.json')
const cartManager = new CartManager('../resources/carts.json')

//Products

app.use()
app.get('/api/products', (req, res) => {
    let limit = Number(req.query.limit)
    if (isNaN(limit)) {
        limit = -1
    }

    res.send(productManager.getProducts(limit))
})
app.get('/api/products/:pid', (req, res) => {
    let idBuscado = req.params['pid']
    let resultado = productManager.getProductById(idBuscado)
    res.send(resultado)
})
app.delete('/api/products/:pid', (req, res) => {
    let idBuscado = req.params['pid']
    res.status(productManager.deleteProduct(idBuscado)).send()
})
app.post('/api/products', (req, res) => {
    if (areParamsValid(req.body)) {
        let product = new Product(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock, req.body.category, req.body.status)

        res.status(productManager.addProduct(product)).send()
    } else {
        res.status(500).send({'message': 'missing mandatory parameter'}).end()
    }
})
app.put('/api/products/:pid', (req, res) => {
    let idBuscado = req.params['pid']

    let product = new Product(req.body.title, req.body.description, req.body.price, req.body.thumbnail, req.body.code, req.body.stock, req.body.category, req.body.status)

    res.status(productManager.updateProduct(idBuscado, product)).send()
})

//Carts
app.post('/api/carts', (req, res) => {
    let cart = new Cart(req.body.products)
    res.status(cartManager.createCart(cart)).send()
})
app.get('/api/carts/:cid', (req, res) => {
    let idBuscado = req.params['cid']
    res.send(cartManager.getCart(idBuscado))
})
app.post('/api/carts/:cid/product/:pid', (req, res) => {
    let cartId = req.params['cid']
    let productId = req.params['pid']

    res.send(cartManager.addProductToCart(cartId, productId))
})

function areParamsValid(body) {
    return !(body.title == null || body.description == null || body.price == null || body.code == null || body.stock == null || body.category == null);

}

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
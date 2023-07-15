const express = require('express')
const app = express();
app.use(express.json())
const port = 8080


app.use(express.json());


const {productRouter} = require("./routes/product.route")
const {cartRouter} = require("./routes/carts.route")

//Products

app.use( "/api/products" , productRouter)

//Carts
app.use( "/api/carts" , cartRouter)

function areParamsValid(body) {
    return !(body.title == null || body.description == null || body.price == null || body.code == null || body.stock == null || body.category == null);

}

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
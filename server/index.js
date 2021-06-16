const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(express.json());        // middleware to convert unreadable data to a readable JSON format
app.use(cors());                // middleware to allow resource sharing between frontend and backend



// creating and starting a server
// Parameters : 
//      1. PORT NUMBER
//      2. Callback function

app.listen(8000, () => {
    console.log("Server is running...")
})



// establishing connection with mongo db

mongoose.connect("mongodb://localhost:27017/product_database", { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("Connection established to mongo db successfully...");
});


// creating schema for product collection

const productSchema = new mongoose.Schema({
    name : String,
    price : Number,
    quantity : Number,
    color : String,
    rating : Number,
    description: String,
    category : String
})



// creating a model to connect schema with the mongo db

const productModel = new mongoose.model('products', productSchema);



// handling GET request     MUST BE ASYNC
// Parameters :
//      1. Path where request is sent
//      2. Callback function ("req" is for request, "res" is for response)

app.get("/products", async (req, res) => {
    console.log("\nGET request received...");
    let products = await productModel.find();
    res.send(products);
})





// handling POST request
// Parameters :
//      1. Path where request is sent
//      2. Callback function ("req" is for request, "res" is for response)

app.post("/products", (req, res) => {
    console.log("\nPOST request received...");
    let product = req.body;
    let productObj = productModel(product);
    productObj.save();
    res.send({"message" : "product added to db...", "product" : productObj });
    console.log("product added to db...");
})






// handling PUT request (update request)
// Parameters :
//      1. Path where request is sent
//      2. Callback function ("req" is for request, "res" is for response)

app.put("/products/:id", (req, res) => {
    console.log("\nPUT request received...");

    let id = req.params.id;
    let productData = req.body;

    productModel.updateOne({ "_id" : id }, { $set : productData }, () => {
        res.send({"message" : "product updated..."});
        console.log("product updated...")
    });
    
})




// handling DELETE request
// Parameters :
//      1. Path where request is sent ("/:id" makes it a dynamic parameter) (for multiple parameters : "/:parameter1/:parameter2")
//      2. Callback function ("req" is for request, "res" is for response)

app.delete("/products/:id", (req, res) => {
    console.log("\nDELETE requeest received...")

    let id = req.params.id;

    productModel.deleteOne({ "_id" : id }, () => {
        console.log("product deleted successfully...")
        res.send({"message" : "product deleted successfully..."});
    });
})

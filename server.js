const express = require('express');
const mongoose = require('mongoose');

//Importing modules from routes folder
const homeRoutes = require('./routes/homeRoute');
const bookRoutes = require('./routes/bookRoute');
const productRoutes = require('./routes/prdRoute');
const userRoutes = require('./routes/userRoute');
const auth = require('./middlewares/auth');

const app = express();

const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

app.use(express.json()); //Middleware to parse JSON request bodies (POST)

mongoose.connect('mongodb://localhost:27017/cgc-db');

app.use(homeRoutes);
app.use(bookRoutes);

app.use(auth.basicAuth);

app.use('/products',productRoutes);
app.use('/users',userRoutes);

app.use((req,res) => {
    res.status(404).send('Not Found');
});
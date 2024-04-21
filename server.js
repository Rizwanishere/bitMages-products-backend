const express = require('express');
const mongoose = require('mongoose');

//Importing modules from routes folder
const homeRoutes = require('./routes/homeRoute');
const bookRoutes = require('./routes/bookRoute');
const productRoutes = require('./routes/prdRoute');
const userRoutes = require('./routes/userRoute');
const auth = require('./middlewares/auth');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

const fsStream = fs.createWriteStream(__dirname + '/logs/request.log',{flags: 'a'});
app.use(morgan('combined',{ stream: fsStream }));

app.use(express.json()); //Middleware to parse JSON request bodies (POST)

mongoose.connect('mongodb://localhost:27017/cgc-db');

app.use(homeRoutes);
app.use('/users',userRoutes);

// app.use(auth.basicAuth);
app.use(auth.tokenAuth);

app.use(bookRoutes);
app.use('/products',productRoutes);

app.use((req,res) => {
    res.status(404).send('Not Found');
});
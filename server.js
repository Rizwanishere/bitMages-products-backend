const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

//Importing modules from routes folder
const homeRoutes = require('./routes/homeRoute');
const bookRoutes = require('./routes/bookRoute');
const productRoutes = require('./routes/prdRoute');
const userRoutes = require('./routes/userRoute');
const auth = require('./middlewares/auth');


const app = express();

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

const logsDir = path.join(__dirname,'logs');

if(!fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir);
}

const fsStream = fs.createWriteStream(path.join(__dirname,'logs','request.log'),{flags: 'a'});
app.use(morgan('combined',{ stream: fsStream }));

app.use(express.json()); //Middleware to parse JSON request bodies (POST)

// mongoose.connect('mongodb://localhost:27017/cgc-db');
// const conStr = process.env.dbConStr;
const conStr = 'mongodb+srv://rizwanishere:Hotwheels123@rizwan-cluster.erdoutb.mongodb.net/';
mongoose.connect(conStr);
console.log('DB connected');

app.use(express.static('uploads/'));

app.use(homeRoutes);
app.use('/users',userRoutes);

// app.use(auth.basicAuth);
// app.use(auth.tokenAuth);

app.use(bookRoutes);
app.use('/products',productRoutes);

app.use((req,res) => {
    res.status(404).send('Not Found');
});
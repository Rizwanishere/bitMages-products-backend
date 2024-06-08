const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

//Importing modules from routes folder
const homeRoutes = require('./routes/homeRoute');
const bookRoutes = require('./routes/bookRoute');
const productRoutes = require('./routes/prdRoute');
const userRoutes = require('./routes/userRoute');
const auth = require('./middlewares/auth');


const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

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

// Mongodb atlas || Local mongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cgc-db';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

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
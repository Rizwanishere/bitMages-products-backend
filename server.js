const express = require('express');

//Importing modules from routes folder
const homeRoutes = require('./routes/homeRoute');
const bookRoutes = require('./routes/bookRoute');

const app = express();

const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

app.use(homeRoutes);
app.use(bookRoutes);

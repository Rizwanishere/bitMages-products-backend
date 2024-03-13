const express = require('express');

// Importing the modules from controllers folder
const homeCtrl = require('./controllers/homeCtrl');
const bookCtrl = require('./controllers/bookCtrl');

const app = express();

const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

// syntax - get(path,handler_function)
app.get('/',homeCtrl.home);
app.get('/health',homeCtrl.health)
app.get('/books',bookCtrl.books);
app.get('/authors',bookCtrl.authors)

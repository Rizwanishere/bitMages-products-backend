const express = require('express');
const app = express();

const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

//creating handlers
const handler1 = (req,res)=>{
    res.send('Hello from Express');
};

const handler2 = (req,res)=>{
    const books = [{
        id: 1,
        name: 'Psychology of Money',
        rating: 4,
        author: 'Morgan Housel',
        price: 300  
    }, {
        id: 2,
        name: 'Rich Dad Poor Dad',
        rating: 4.5,
        author: 'Robert Kiyosaki',
        price: 200
    }];
    res.json(books);
}

const handler3 = (req,res)=>{
    const authors = ['Morgan Housel','Robert Kiyosaki'];
    res.json(authors);
}

// syntax - get(path,handler_function)
app.get('/',handler1);
app.get('/books',handler2);
app.get('/authors',handler3)

const authors = (req,res)=>{
    const authors = ['Morgan Housel','Robert Kiyosaki'];
    res.json(authors);
}

const booksDB = [{
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
}, {
    id: 3,
    name: 'The Intelligent Investor',
    rating: 4.3,
    author: 'Benjamin Graham',
    price: 400
}];

// 1. GET
const books = (req,res)=>{
    res.json(booksDB);
}

// 1. GET
const getById = (req,res) => {
    const id = parseInt(req.params.id);

    const filterFn = (elem) => {
        return elem.id === id;
    };

    const filteredBooks = booksDB.filter(filterFn);

    if (filteredBooks[0]) {
        res.status(200);
        res.json(filteredBooks[0]);
    }
    else{
        res.status(404);
        res.send('Not Found');
    }
}

module.exports = {
    books,
    authors,
    getById,
}


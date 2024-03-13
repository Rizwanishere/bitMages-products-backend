const books = (req,res)=>{
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

const authors = (req,res)=>{
    const authors = ['Morgan Housel','Robert Kiyosaki'];
    res.json(authors);
}

module.exports = {
    books,
    authors,
}


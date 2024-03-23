const authors = (req,res)=>{
    const authors = ['Morgan Housel','Robert Kiyosaki'];
    res.send(authors);
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


// 2. CREATE (POST)
const isInvalid = (body) => {
    return !body.name || !body.price || !body.author;
}; 

const post = (req,res) => {
     const { body } = req;
    
     if(isInvalid(body)){
        res.status(400);
        res.send('Bad Request');
     } else {
        booksDB.push(body);
        res.status(201);
        res.send('Created');
     }
}


// 3.DELETE (REMOVE)
const remove = (req,res) => {
    const id = +req.params.id;            //(+) is used to convert a value into a number

    for(let i=0; i<booksDB.length; i++){
        if(booksDB[i].id===id){
            booksDB.splice(i,1);
            break;
        }
    }
    res.status(204).send();
};

// 4.UPDATE (PUT)              //Full update
const put = (req,res) => {
    const id = +req.params.id;
    const payload = req.body;

    if(!payload.id || !payload.name || !payload.price){
        res.status(400).send('Bad Request');
        return;
    } else {
        for(let i=0; i<booksDB.length; i++){
            if (booksDB[i].id === id) {
                booksDB[i].price = payload.price;
                booksDB[i].name = payload.name;
                booksDB[i].author = payload.author;
            }
        }
        res.status(204).send();
    }
}


// 4.UPDATE (PATCH)             //Partial update
const patch = (req,res) => {
    const id = +req.params.id;
    const payload = req.body;

    for(let i=0; i<booksDB.length; i++){
        if(booksDB[i].id ===id){
            for(let key in payload){
                booksDB[i][key] = payload[key];
            }
        }
    }
    res.status(204).send();
}

module.exports = {
    books,
    authors,
    getById,
    post,
    remove,
    put,
    patch
}


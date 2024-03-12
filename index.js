// Import the Http Module
const http = require('http');
const fs = require('fs');

/* Create a HTTP server instance using the 'createServer' 
method and passing a request handler */
const server = http.createServer(handler);

/* Define the request handler function which responds 
with the text "Hello nodeJs" to any incoming request*/
function handler(req,res){
    switch(req.url){
        // In case no url has been entered
        case '/':
            // readFileSync() is a synchronous method provided by the fs module in Node.js,used to read the contents of a file synchronously.
            const contents = fs.readFileSync('index.html');
            // toString() is used because readFileSync() returns file contents as a buffer or string
            res.write(contents.toString());
            res.end();
            break;
        
        case '/books':
            // we are passing objects in an array
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
            // JSON.stringify() is specifically for converting JavaScript objects to JSON strings, not file contents.   
            res.write(JSON.stringify(books));
            res.end();
            break;

        case '/authors':
            const authors = ['Morgan Housel','Robert Kiyosaki'];
            
            res.write(JSON.stringify(authors));
            res.end();
            break;
        
        default:
            res.write('Not Found');
            res.end();
            break;
    }
}

/* Specify the port number on which the server 
will listen for incoming requests */
const port = 3000;

/* Start the server to listen for incoming 
requests on the specified port */
server.listen(port,()=> console.log(`The server is running on ${port}`));



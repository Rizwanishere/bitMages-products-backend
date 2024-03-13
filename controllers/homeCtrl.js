const home = (req,res)=>{
    res.status(200);
    res.send('Hello from Express');
};

const health = (req,res)=>{
    res.status(200);
    res.json({status:'UP'});
}

module.exports = {
    home,
    health,
}
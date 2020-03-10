const express = require('express')
const server = express();
const shortid = require('shortid')

let users = [];
server.use(express.json());

//POST USERS
server.post('/api/users', (req, res)=>{
    const userInfo = req.body;

    userInfo.id = shortid.generate();
    users.push(userInfo)

    if(!userInfo.name || !userInfo.bio){
        //Bad Request
        res.status(400).json({errorMessage: "Please provide name and bio for the user."}); 
    }
    if(userInfo){
        res.status(201).json(userInfo); //201 means it's been created successfully 
    }
    if(!userInfo){
        //Server Error
        res.status(500).json({errorMessage: "There was an error while saving the user to the database" }); 
    }

    // userInfo.id = shortid.generate();
    // users.push(userInfo)
    // res.status(201).json(userInfo); //201 means it's been created successfully

})

//GET USERS
server.get('/api/users', (req, res)=>{
    const userInfo = req.body;

    //SERVER ERROR
    if(!userInfo){
        res.status(500).json({errorMessage: "The users information could not be retrieved." }); 
    }
   
    //SUCCESSFUL RESPONSE
   if(userInfo){
    res.status(200).json(users)   
   } 
   
})

//GET USER BY ID
server.get('/api/users/:id', (req, res)=>{
let id = +req.params.id;
console.log(id, 'req params id')
const userInfo = users.find(({userId})=>userId === id);

if(userInfo){
    res.status(200).json(userInfo)   
   } 
else{
    res.status(404).json({ message: "The user with the specified ID does not exist." })   
   } 
    // res.status(200).json(userInfo)
})


const PORT = 6000;
server.listen(PORT, ()=>{
    console.log(`\n ** API on http://localhost:${PORT} **\n`)
});
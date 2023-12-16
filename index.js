// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

//serve a static html file -- express server
app.use(express.static("public"));

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file

});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    console.log(pets);
    res.send(pets); //when empty, needed so that the request doesnt hang when we send a request, because it will always expect some sort of response

});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request --> owner is whatever we put in the query parameter
    const owner = req.query.owner
    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    if (pet)res.send(pet); //if else statement, if it doesnt run, then we need some way to close off the request
    res.send("no pet with that owner found");

});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request --> create a variable for name
    const name = req.params.name; //to get a route parameter, grab it from the parameter 

    // find the pet in the pets array

    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    if (pet) res.send(pet);
    res.send("No pet found with that name");

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
// Express to run server and routes
const express = require('express');

// Start an instance of app
const app = express();

// JS object to hold project data
const projectData = {}

// Dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize main project folder
app.use(express.static('website'));

const port = 8000;

// Confirm that server is running
const server = app.listen(port, ()=> {
  console.log(`running on localhost: ${port}`)
});

// Set up GET route
app.get('/all', (req, res)=> {
  res.send(projectData);
});

// * Set up POST routes *
// *
// *
// First test the route
app.post('/add', (req, res)=> {
  res.send('POST received');
});

// Then a route for 'temperature'
const tempData = [];

app.post('/temp', (req, res)=> {
  tempData.push(req.body);
});

// Then a route for 'date'
const dateData = [];

app.post('/date', (req, res) => {
  dateData.push(req.body);
});

// Then a route for 'user response'
const userData = [];

app.post('/user', (req, res) => {
  userData.push(req.body);
});
// *
// *

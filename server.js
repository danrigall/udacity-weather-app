// Express to run server and routes
const express = require('express');

// Start an instance of app
const app = express();

// JS object to hold project data
const projectData = []

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

// TODO: SET UP POST ROUTES
app.post('/add', addData);

function addData (req, res) {
  let newData = {
    date: req.body.date,
    temp: req.body.temp,
    thoughts: req.body.thoughts
  }
  console.log(newData)
  projectData.push(newData)
  res.send(projectData)
  console.log(projectData)
}

// Dummy API (for testing)
const fakeData = {"tempurature": 280}

app.get('/fakeAPI', getFakeData)

function getFakeData(req, res) {
  res.send(Object.values(fakeData));
}
// * * * * *

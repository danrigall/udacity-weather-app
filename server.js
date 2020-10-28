// Express to run server and routes
const express = require('express');

// Start an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Pull sensitive info with dotenv
const dotenv = require('dotenv')
dotenv.config()

const fetch = require('node-fetch');

// Initialize main project folder
app.use(express.static('website'));

const port = 8000;

// Confirm that server is running
const server = app.listen(port,() => {
  console.log(`Server running on localhost: ${port}`)
});

// Array to hold project data
const projectData = []

// Set up GET route
app.get('/all', (req, res) => {
  res.send(projectData);
});

const addData = async (req, res) => {
  let newInput = {
    zip: req.body.zip,
    thoughts: req.body.thoughts
  }
  console.log(newInput)
  const weather = await getWeather(newInput.zip);
  let finalEntry = {
    date: getDate(),
    temp: weather.main.temp,
    thoughts: newInput.thoughts,
  }
  projectData.unshift(finalEntry)
  res.send(projectData)
  console.log(projectData)
}

// Set up POST route
app.post('/add', addData);

function getDate() {
  let d = new Date();
  let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
  return newDate
}

// GET from OpenWeather API
const getWeather = async (zip) => {
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather?&units=imperial&zip=';
  const apiKey = '&appid=' + process.env.API_KEY;

  const request = await fetch(baseURL + zip + apiKey);
  try {
    const weatherData = await request.json()
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log("ERROR in GET:", error);
  }
}

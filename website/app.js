// Global Variables
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?&units=imperial&zip=';
const apiKey = '&appid=0b09e4144e6ece0ef3dc8e51ae487fe4';
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

// Function to make sure both required inputs are filled
function clickRespond() {
  if (zip.value.length !== 5) {
    zip.classList.add('invalid');
    console.log('Invalid zip code entered!')
    alert('Please enter a 5-digit zip code!')
  } else if (feelings.value === "") {
    feelings.classList.add('invalid');
    console.log('Both input fields must be filled!');
    alert('Please enter some weathery thoughts to post!')
  } else {
    fetchAndPost()
  }
}

function fetchAndPost() {
  const zipValue = zip.value;
  // getTemp('/simAPI')
  console.log(baseURL + zipValue + apiKey)
  getTemp(baseURL, zipValue, apiKey)
  .then(function(temp) {
    console.log(temp)
    return postData('/add', {temp: temp, date: newDate, thoughts: feelings.value})
  })
  .then(function() {
    updateUI();
  })
}

// Async POST
const postData = async (url='', data={})=> {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData
  } catch(error) {
    console.log('ERROR in POST:', error);
  }
};

// Async GET
const getTemp = async (baseURL, zip, key)=> {
  const request = await fetch(baseURL+zip+key);
// const getTemp = async (url) => {
//   const request = await fetch(url);
  try {
    const allData = await request.json()
    console.log(allData["main"]["temp"]);
    return allData["main"]["temp"];
  } catch(error) {
    console.log("ERROR in GET:", error);
  }
};

// Update UI after fetching needed data
const updateUI = async()=> {
  const request = await fetch('/all')
  try{
    const allData = await request.json()
    console.log(allData)
    document.getElementById('entryHolder').style.display = 'block'
    document.getElementById('date').innerHTML = `<u>Date:</u> ${allData[0].date}`
    document.getElementById('temp').innerHTML = `<u>Temperature:</u> ${allData[0].temp}&deg`
    document.getElementById('content').innerHTML = allData[0].thoughts
    clearFields();
  } catch(error){
    console.log('ERROR in UI update:', error)
  }
}

function clearFields() {
  zip.value = ""
  feelings.value = ""
  zip.classList.remove('invalid')
  feelings.classList.remove('invalid')
}

document.getElementById('generate').addEventListener('click', clickRespond)

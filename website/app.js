// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// TODO: FIGURE OUT CLICK EVENT!!!!!!!!!!
function checkEmpty() {
  const zip = document.getElementById('zip').value
  const feelings = document.getElementById('feelings').value
  if (zip === "" || feelings === "") {
    console.log('zip and/or feelings are empty');
  } else {
    clickRespond()
  }
}

function clickRespond(evt) {
  const thoughts = document.getElementById('feelings').value;
  // Dummy API call
  getTemp('/fakeAPI')
  .then(function(temp) {
    console.log(temp)
    postData('/add', {temp, date: newDate, thoughts: thoughts})
  })
  .then(function() {
    updateUI();
  })
}

// function performAction(e) {
//   const zip = document.getElementById('zip').value;
//   const feelings = document.getElementById('feelings').value;
//   getWeather(baseURL, zip, apiKey)
//     .then(function (data) {
//       console.log(data);
//       postData('/addData', {
//         date: d,
//         temp: data.main.temp,
//         content: feelings
//       })
//     })
//     .then(function () { updateUI() }
//     )
// }

// Global Variables
const baseURL = 'https://openweathermap.org/current';
const apiKey = '0b09e4144e6ece0ef3dc8e51ae487fe4';

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
const getTemp = async (url)=> {
  const request = await fetch(url);
  try {
    const allData = await request.json()
    console.log(allData);
    return allData;
  } catch(error) {
    console.log("ERROR in GET:", error);
  }
};



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
  document.getElementById('zip').value = ""
  document.getElementById('feelings').value = ""
}

document.getElementById('generate').addEventListener('click', checkEmpty)

// checkEmpty();

// Global Variables
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');



// Function to respond to the click only after rquirements are filled
function clickRespond() {
  if (zip.value.length !== 5) {
    zip.classList.add('invalid');
    console.log('Invalid zip code entered!')
  } else if (feelings.value.length < 4) {
    feelings.classList.add('invalid');
    console.log('Both input fields must be filled!');
  } else {
    postAndFetch()
  }
}

function postAndFetch() {
  postInput('/add', {zip: zip.value, thoughts: feelings.value})
  .then((object) => {
    console.log(object)
    updateUI(object)
  })
  clearFields()
}

const postInput = async (url, data) => {
  const request = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(data),
  });
  try {
    const response = await request.json();
    console.log(response)
    return response
  } catch (error) {
    console.log('ERROR in POST:', error);
  }
};

// *** TODO: Add ability to post multiple entries! ***
// *** TODO: Add more weather data bits & cool icons/graphics!! ***
const updateUI = async()=> {
  const request = await fetch('/all')
  try{
    const allData = await request.json()
    document.getElementById('entryHolder').style.display = 'block'
    document.getElementById('date').innerHTML = `<u>Date:</u> ${allData[0].date}`
    document.getElementById('temp').innerHTML = `<u>Temperature:</u> ${allData[0].temp}&deg`
    document.getElementById('content').innerHTML = allData[0].thoughts
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

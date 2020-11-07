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

// *** TODO: Make each entry stay after REFRESH!! ***
// *** TODO: Add more weather data bits & cool icons/graphics!! ***
function updateUI(object) {
  const newDiv = document.createElement('div');
  newDiv.classList.add('entryHolder');
  newDiv.innerHTML = `
      <div class="date"><u>Date:</u> ${object.date}</div>
      <div class="temp"><u>Temperature:</u> ${object.temp}</div>
      <div class="content">${object.thoughts}</div>
  `;
  document.getElementById('all_posts').appendChild(newDiv)
}

function clearFields() {
  zip.value = ""
  feelings.value = ""
  zip.classList.remove('invalid')
  feelings.classList.remove('invalid')
}

document.getElementById('generate').addEventListener('click', clickRespond)

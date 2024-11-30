
const serverURL = 'http://localhost:8000/test'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);
const resultDiv = document.getElementById('results')

function handleSubmit(event) {
    event.preventDefault();
    // Get the URL from the input field
const formText = document.getElementById('name').value;
console.log(formText);
    // Check if the URL is valid
       (formText) => { fetch(serverURL, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify( { url : formText } )
          }).then(res => {
            return res.json();}).then(data => {
              const polarity = data.sentiment.polarity;
              const subjectivity = data.sentiment.subjectivity;
              const textSnippet = data.sentence_list[0].text;

              resultDiv.innerHTML += `
                  <p>Polarity: ${polarity}</p>
                  <p>Subjectivity: ${subjectivity}</p>
                  <p>Text Snippet: ${textSnippet}</p>
              `;})
}}

// Function to send data to the server

// Export the handleSubmit function
export { handleSubmit };


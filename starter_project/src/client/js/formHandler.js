// Replace checkForName with a function that checks the URL
import { checkForName } from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // This is an example code that checks the submitted name. You may remove it from your code
    checkForName(formText);
    
    // Check if the URL is valid
    function isValidUrl(urlString) {
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        return urlPattern.test(urlString);
      }

      let url = formText;
      if (isValidUrl(url)) {
        fetch(serverURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
          }).catch(error => {
            console.error('Error:', error);
            // Handle errors, e.g., display an error message to the user   
        
          }).then(data => {
            console.log('Server response:', data);   
      
            const resultDiv = document.getElementById('result');

                // Clear any previous content
                resultDiv.innerHTML = '';

                // Append data to the result div
                const polarity = data.sentiment.polarity;
                const subjectivity = data.sentiment.subjectivity;
                const textSnippet = data.sentence_list[0].text;

                resultDiv.innerHTML += `
                    <p>Polarity: ${polarity}</p>
                    <p>Subjectivity: ${subjectivity}</p>
                    <p>Text Snippet: ${textSnippet}</p>
                `;
          })
      } else {
        console.log("Invalid URL");
      }
        // If the URL is valid, send it to the server using the serverURL constant above
      
}

// Function to send data to the server

// Export the handleSubmit function
export { handleSubmit };


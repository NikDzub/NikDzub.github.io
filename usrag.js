// Define your API endpoint and Bearer token
const apiUrl = 'https://unlockcontent.net/api/v2';
const token = '27266|iEgx5HPu7PX97DD2NcD0G7O5VI6lEuDJ4b4ThYIe343a8bf1';

// Make the fetch request
fetch(apiUrl, {
  method: 'GET', // or 'POST', 'PUT', 'DELETE', etc. depending on your use case
  headers: {
    Authorization: `Bearer ${token}`, // Include the Bearer token
    'Content-Type': 'application/json', // Optional, depending on your API requirements
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // or response.text() if the response is plain text
  })
  .then((data) => {
    console.log('Data:', data); // Handle the data from the response
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

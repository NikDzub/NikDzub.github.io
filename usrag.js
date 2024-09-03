const agent = navigator.userAgent;
// const agent =
//   'Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36';
const token = '27266|iEgx5HPu7PX97DD2NcD0G7O5VI6lEuDJ4b4ThYIe343a8bf1';
const us_ip = '45.33.144.25';
const apiUrl = 'https://unlockcontent.net/api/v2';
// const apiUrl = 'https://cors-anywhere.herokuapp.com/unlockcontent.net/api/v2';
const root = document.querySelector('#root');
root.style.display = 'block';

const info = document.querySelector('#info');
const ip_info = document.querySelector('#ip');
const ua_info = document.querySelector('#user_agent');

if (agent.indexOf('music') >= 0) {
  console.log('in tiktok');
  alert('Please open in browser');
  root.style.display = 'none';
} else {
  // GET IP
  let ip = '';

  fetch('https://api.ipify.org?format=json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.ip);
      ip = data.ip;
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });

  const urlWithParams = `${apiUrl}?ip=${encodeURIComponent(
    ip
  )}&user_agent=${encodeURIComponent(agent)}&ctype=1`;

  console.log(urlWithParams);

  fetch(urlWithParams, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log(response.json());
      return response.json();
    })
    .then((data) => {
      console.log(data.offers);

      const filteredOffers = data.offers.filter((offer) =>
        offer.name.toLowerCase().includes('coin')
      );

      const sortedOffers = filteredOffers.sort((a, b) => {
        const payoutA = parseFloat(a.payout) || 0;
        const payoutB = parseFloat(b.payout) || 0;
        return payoutB - payoutA;
      });

      const links = document.querySelectorAll('a');
      links.forEach((link) => {
        link.href = sortedOffers[0].link;
      });
      // location.href = sortedOffers[0].link;
    });
}

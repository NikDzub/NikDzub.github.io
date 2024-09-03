const agent = navigator.userAgent;
// const agent =
//   'Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36';
const apiUrl = 'https://node-pvy0z8ei9-nikdzubs-projects.vercel.app/api/data';
// const apiUrl = 'https://cors-anywhere.herokuapp.com/unlockcontent.net/api/v2';
const root = document.querySelector('#root');
root.style.display = 'block';

const info = document.querySelector('#info');
const ip_info = document.querySelector('#ip');
const ua_info = document.querySelector('#user_agent');

if (agent.indexOf('music') >= 0) {
  console.log('in tiktok');
  alert(
    'The TikTok browser does not support this feature. Please open this page in a regular web browser.'
  );
  root.style.display = 'none';
} else {
  // https://locked4.com/cl/i/8d5r9r
  // const links = document.querySelectorAll('a');
  // links.forEach((link) => {
  //   link.href = 'https://locked4.com/cl/i/8d5r9r';
  // });

  // GET IP
  fetch('https://api.ipify.org?format=json')
    .then((ip_response) => ip_response.json())
    .then((ip_data) => {
      console.log('IP:', ip_data.ip);

      const urlWithParams = `${apiUrl}?ip=${encodeURIComponent(
        ip_data.ip
      )}&user_agent=${encodeURIComponent(agent)}&ctype=1`;
      console.log('Request URL:', urlWithParams);

      return fetch(urlWithParams, {
        method: 'GET',
      });
    })
    .then((offer_response) => {
      if (!offer_response.ok) {
        throw new Error(`HTTP error! Status: ${offer_response.status}`);
      }
      return offer_response.json();
    })
    .then((offer_data) => {
      console.log('Offers Data:', offer_data.offers);

      const filteredOffers = offer_data.offers.filter((offer) =>
        offer.name.toLowerCase().includes('coin')
      );

      const sortedOffers = filteredOffers.sort((a, b) => {
        const payoutA = parseFloat(a.payout) || 0;
        const payoutB = parseFloat(b.payout) || 0;
        return payoutB - payoutA;
      });

      console.log('Sorted Offers:', sortedOffers);

      const links = document.querySelectorAll('a');
      links.forEach((link) => {
        if (sortedOffers.length > 0) {
          link.href = sortedOffers[0].link;
        }
      });
      // Optionally redirect to the top offer
      // location.href = sortedOffers[0]?.link || '#';
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

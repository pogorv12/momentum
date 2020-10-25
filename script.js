// DOM Elements
const time = document.querySelector('.time'),
  city = document.querySelector('.city'),
  forecast = document.querySelector('.forecast'),
  wicon = document.querySelector('.wicon'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  date = document.querySelector('.date'),
  quote = document.querySelector('.quote'),
  newQuote = document.querySelector('.newQuote'),
  swipe = document.querySelector('.swipeBg');

const weekDays = ['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let constHour = -1;

let pictureSetHead = Math.ceil(Math.random()*20);

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  date.innerHTML = today.toDateString();
  if (!min && !sec) {
    setBgGreet();
  }
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function pictureSet(hour){
  return pictureSetHead + hour % 6 < 10 ? '0' + (pictureSetHead + hour % 6) :
            pictureSetHead + hour % 6 > 20 ? '0' + (pictureSetHead + hour % 6) % 10 : pictureSetHead + hour % 6 + '';
}

// Set Background and Greeting
function setBgGreet(forceSet = -1) {
  let today = new Date(),
    hour = today.getHours();

  hour = forceSet < 0 ? hour : forceSet;

  if (hour < 6) {
    // Night
    document.body.style.backgroundImage =
      "url('assets/images/night/" + pictureSet(hour) + ".jpg')";
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
    "url('assets/images/morning/" + pictureSet(hour) + ".jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
    "url('assets/images/day/" + pictureSet(hour) + ".jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('assets/images/evening/" + pictureSet(hour) + ".jpg')";
    greeting.textContent = 'Good Evening, ';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') !== null) {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }

}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') !== null) {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

// Get Focus
function getCity() {
  if (localStorage.getItem('city') !== null) {
    city.textContent = localStorage.getItem('city');
  }
  getWeather();
}

function setCity(e) {
  console.log('test');
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('city', e.target.innerText);
      city.blur();
    }
  } else {
    localStorage.setItem('city', e.target.innerText);
  }
  if (localStorage.getItem('city').length > 0) {
    getWeather();
  }
}

async function getQuote(){
  fetch('https://api.chucknorris.io/jokes/random')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    quote.innerText = data.value;
  });
}

async function getWeather(){
  let city = 'London';
  city = localStorage.getItem('city') === undefined ? city : localStorage.getItem('city');
   //fetch(https://api.openweathermap.org/data/2.5/weather?q=minsk&appid=eee8a0fa27d3b1bdad12706f4a650c1a')
  //fetch('https://samples.openweathermap.org/data/2.5/weather?q=' + city + '&appid=b1b15e88fa797225412429c1c50c122a1&units=metric')
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=6ba25fbc62d3d73369c6be9caf83a8d7&units=metric`)
  .then((response) => {
    return response.ok ? response.json() : false;
  })
  .then((data) => {
    if (!data){
      wicon.style.display = 'none';
      forecast.innerText = `Weather forecast not available.`;  
      return;
    }

    wicon.style.display = 'block';
    wicon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
    forecast.innerHTML = `<span>&nbsp;Temp:&nbsp;${data.main.temp}°C&nbsp;</span> <span>&nbsp;Humidity:&nbsp;${data.main.humidity}%&nbsp;</span> <span>&nbsp;Pressure:&nbsp;${data.main.pressure}hPa&nbsp;</span>`;
  });
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

swipe.addEventListener('click', function (){
  let today = new Date();
  constHour = constHour === 24 ? 0 : 
                constHour === -1 ? today.getHours() + 1 : constHour + 1;
  setBgGreet(constHour);
});

newQuote.addEventListener('click', function (){
  getQuote();
});

newQuote.addEventListener('click', function (){
  getWeather();
});




// Run
showTime();
setBgGreet();
getName();
getFocus();
getQuote();
getWeather();
getCity();
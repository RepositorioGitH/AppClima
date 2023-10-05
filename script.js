const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector("#city");
const nameContry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(nameCity.value === '' || nameContry.value === ''){
        showError('Ambos campos son Obligatorios');
        return;
    }
 
    callAPI(nameCity.value, nameContry.value);

//console.log(nameCity.value);
//console.log(nameContry.value);
}) 

function callAPI(city, country) {
    const apiId = "71978df500944888f7a9922f0b7b6000";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
    .then(data => {
        return data.json();
    })
    .then(dataJSON => {

        if (dataJSON.cod === '404' ) {
            showError('Ciuedad no encontrada....'); 
        }
        else{
            clearHTML();
            showWeather(dataJSON);
        } 
        console.log(dataJSON);
    })
    .catch(error => {
        console.log(error);
    })
}

function showWeather(data){
    const   { name, main:{temp, temp_min, temp_max}, weather:[arr] } = data;
 
    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('DIV');
   
    content.innerHTML = 
    `            
    <h5>Clima en ${name}</h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
    <h2>Act: ${degrees}ºC</h2>
    <p>Min: ${min}ºC</p>
    <p>Max: ${max}ºC</p>
    `;

    result.appendChild(content);
}

function showError(message) {
    console.log(message);


    const alert = document.createElement('P');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp) {
    return parseInt(temp - 273.15);
}

function clearHTML() {
    result.innerHTML = "";
}
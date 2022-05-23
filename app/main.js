// TRAER DATOS CONST
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const lupaIcon = ['.lupaIcon']
let input = document.querySelector('input');
let button = document.querySelector('button');
const city = ('London');
let contador = 0;
let addList = ('.addList')

// API KEY constante
const API_KEY ='7228d25d50b11f8cbb6fad12eb358a13';
console.log (currentTempEl)

//PINTAR DATOS ACTUALES
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM'

  timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

  dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

//OBTENER POSICION DEL CLIENTE
getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}


//FUNCIÓN MOSTRAR DATOS A PARTIR DE LAT LON
function showWeatherData (data){
  let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

  currentWeatherItemsEl.innerHTML = 
  `<div class="weather-item">
      <div>Humidity</div>
      <div>${humidity}%</div>
  </div>
  <div class="weather-item">
      <div>Pressure</div>
      <div>${pressure}</div>
  </div>
  <div class="weather-item">
      <div>Wind Speed</div>
      <div>${wind_speed}</div>
  </div>

  <div class="weather-item">
      <div>Sunrise</div>
      <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
  </div>
  <div class="weather-item">
      <div>Sunset</div>
      <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
  </div>
  
  
  `;
  let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })

    


    weatherForecastEl.innerHTML = otherDayForcast;
}


//BUSCADOR
 button.addEventListener("click", (e) =>{
   getWeatherData(input.value)
   //setInterval(input.value)
   console.log(input.value)
   const city = (input.value);

       if(input.value != ""){
         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
         .then(res => res.json())
         .then(data => {
           console.log(data)
       });
     }
   });



   //GUARDAR CIUDADES
let btnAdd = document.querySelector('#btnAdd');
let addlist = document.querySelector('.addlist');
db = new PouchDB('saveCities')

   function capCity(){
     let ciudadAdd = document.querySelector ('#time-zone');
     let doc = {
      "_id": `city${contador}`,
      "name": ciudadAdd.textContent
     }
     db.put(doc);
     verciudades();
   };
   function verciudades (){


    db.allDocs({include_docs: true}, function(error, docs) {
      if (error) {
          return console.log(error);
      } else {                
          ciudades = docs.rows;          
          counter = docs.rows.length;
          addList.innerHTML = "";
          ciudades.forEach(element => {     
              let city = `<li class="citySave">
                              <div>${element.doc.name}</div>
                          </li> 
                          `;
              addList.innerHTML += city;
          });

      }
  });

};

//BTN AÑADIR CIUDADES
btnAdd.addEventListener ("click", capCity, false);





     // if(searchInput.value != ""){
      
    //   ///api/location/search/?query=london
    //   fetch(`https://www.metaweather.com/api/location/search/?query=${searchInput.value}`)
    //   .then((res) => res.json())
    //   .then((res) => {})
  
  //       if(res.length == 1){
  //         let cityname = res[0].title;
  //         fetch(`https://www.metaweather.com/api/location/${res[0].woeid}`)
  //         .then((woeid) => woeid.json())
  //         .then((woeid) => {
  //           console.log(woeid.consolidated_weather[0]);

  //           let city = `
  //           <div class="cardDay">
  //           <h5 class="cityname">${cityname}</h5>
  //           <h6 class="onewIcon">${Math.round(woeid.consolidated_weather[0].max_temp)} ºC</h6>
  //           <h5 class="oneDayTemp"></h5>
  //           <button class="shareIcon"><img src="/assets/images/share.svg" alt="share icon"></button>
  //           <button class="shareIcon"><img src="/assets/images/ADD_ICON.svg" alt="add icon"></button>
  //       </div>
  //           `;
  //           ciudadencontrada.innerHTML = city;

            
  //         })
  //       }else{
  //         alert("no tengo datos sobre esa ciudad");
  //         searchInput.value = "";
  //       }

  //     })

  //   }else{
  //     alert("introduce una ciudad")
  //   }


  // });

























///////////// OLD CODE ////////////////////

// // window.onload = () => {
// //   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7228d25d50b11f8cbb6fad12eb358a13`)
// //   .then((res) => res.json())
// //   .then((res) => {
// //   console.log(res)
// //   let city = "";
// //   //let city = document.querySelector(".yourCityName");
// //   city.innerHTML = res.name;
// //   })
// // }



// window.onload = () => {

//   //
//   let succcess = (position) =>  {

//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
//     let alt = position.coords.altitude;

    


//     //CIUDAD CON LAT Y LOG
//     //alert(`Estas en ${lat} latitud, ${long} longitud`);
//     //fetch(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`)
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7228d25d50b11f8cbb6fad12eb358a13`)
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res)
//       let city = document.querySelector(".yourCityName");
//       city.innerHTML = res.name;

 
//      //vertemperaturas(res.woeid)

//     })
//   }
//   let error = () =>{
//     alert ('error!')
//   }



//   if(navigator.geolocation){
    
//     navigator.geolocation.getCurrentPosition(succcess, error);
//   }else{
//       alert('Permite a esta app conocer la ubiación para mejorar el servicio :)')
//   };

//   //https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02
//   //https://www.metaweather.com/api/location/search/?query=london
//   function vertemperaturas(){
//      //TEMPERATURA
//      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7228d25d50b11f8cbb6fad12eb358a13`)
//      .then((res) => res.json())
//      .then((res) => {
//       console.log(res);
//        let .temp = document.querySelector(".yourCityTemp");
//        temp.innerHTML = res.temp;
//        //temp.innerHTML = res.temp`${Math.round('temp')} ºC`;

//        let bigIcon = document.querySelector(".yourCityIcon");
//        bigIcon.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[0].weather_state_abbr}.svg" />`;
//        //bigIcon.innerHTML = `<img src="../assets/images/${woeid.consolidated_weather[0].weather_state_abbr}.svg" />`;

//        let cielo = document.querySelector(".cielo");
//        cielo.innerHTML = `${(woeid.consolidated_weather[0].weather_state_name)}`;

//        let humedad = document.querySelector(".humedad");
//        humedad.innerHTML = `${woeid.consolidated_weather[0].humidity} %`;

//        let maxTemp = document.querySelector(".maxTemp");
//        maxTemp.innerHTML = `${Math.round(woeid.consolidated_weather[0].max_temp)} ºC`;

//        let minTemp = document.querySelector(".minTemp");
//        minTemp.innerHTML = `${Math.round(woeid.consolidated_weather[0].min_temp)} ºC`;

//        let windSpeed = document.querySelector(".windSpeed");
//        windSpeed.innerHTML = `${Math.round(woeid.consolidated_weather[0].wind_speed)} Km/h`;

//        let precipitaciones = document.querySelector(".precipitaciones");
//        precipitaciones.innerHTML = `${Math.round(woeid.consolidated_weather[0].predictability)} %`;

//        let presionAire = document.querySelector(".airPre");
//        presionAire .innerHTML = `${Math.round(woeid.consolidated_weather[0].air_pressure)} hPa`;

//        //VERTICAL SCROLL
//        //1 DAY
//        let onedaynext = document.querySelector(".onewIcon");
//        onedaynext.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[1].weather_state_abbr}.svg" />`;

//        let fechaOneDay = document.querySelector(".fechaOneDay");
//        let fechaOne = new Date(`${woeid.consolidated_weather[1].applicable_date}`);
//        fechaOneDay.innerHTML = `${fechaOne.toLocaleDateString("es-ES")}`;

//        let oneDayTemp = document.querySelector(".oneDayTemp");
//        oneDayTemp.innerHTML = `${Math.round(woeid.consolidated_weather[1].the_temp)} ºC`;

//        //https://www.metaweather.com/static/img/weather/hr.svg

//        //2 DAY
//        let twodaynext = document.querySelector(".twowIcon");
//        twodaynext.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[2].weather_state_abbr}.svg" />`;

//        let fechaTwoDay = document.querySelector(".fechaTwoDay");
//        let fechaTwo = new Date(`${woeid.consolidated_weather[2].applicable_date}`);
//        fechaTwoDay.innerHTML = `${fechaTwo.toLocaleDateString("es-ES")}`;

//        let twoDayTemp = document.querySelector(".twoDayTemp");
//        twoDayTemp.innerHTML = `${Math.round(woeid.consolidated_weather[2].the_temp)} ºC`;

//        //3 DAY
//        let threedaynext = document.querySelector(".threewIcon");
//        threedaynext.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[3].weather_state_abbr}.svg" />`;

//        let fechaThreeDay = document.querySelector(".fechaThreeDay");
//        let fechaThree = new Date(`${woeid.consolidated_weather[3].applicable_date}`);
//        fechaThreeDay.innerHTML = `${fechaThree.toLocaleDateString("es-ES")}`;

//        let threeDayTemp = document.querySelector(".threeDayTemp");
//        threeDayTemp.innerHTML = `${Math.round(woeid.consolidated_weather[3].the_temp)} ºC`;

//        //4 DAY
//        let fourdaynext = document.querySelector(".fourwIcon");
//        fourdaynext.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[4].weather_state_abbr}.svg" />`;

//        let fechaFourDay = document.querySelector(".fechaFourDay");
//        let fechaFour = new Date(`${woeid.consolidated_weather[4].applicable_date}`);
//        fechaFourDay.innerHTML = `${fechaFour.toLocaleDateString("es-ES")}`;

//        let fourDayTemp = document.querySelector(".fourDayTemp");
//        fourDayTemp.innerHTML = `${Math.round(woeid.consolidated_weather[4].the_temp)} ºC`;

//        //5 DAY
//        let fivedaynext = document.querySelector(".fivewIcon");
//        fivedaynext.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[5].weather_state_abbr}.svg" />`;

//        let fechaFiveDay = document.querySelector(".fechaFiveDay");
//        let fechaFive = new Date(`${woeid.consolidated_weather[5].applicable_date}`);
//        fechaFiveDay.innerHTML = `${fechaFive.toLocaleDateString("es-ES")}`;

//        let fiveDayTemp = document.querySelector(".fiveDayTemp");
//        fiveDayTemp.innerHTML = `${Math.round(woeid.consolidated_weather[5].the_temp)} ºC`;
//      });
//   }
 
  
// }

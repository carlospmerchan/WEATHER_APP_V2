window.onload = () => {

  //
  let succcess = (position) =>  {

    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let alt = position.coords.altitude;

    


    //CIUDAD CON LAT Y LOG
    //alert(`Estas en ${lat} latitud, ${long} longitud`);
    fetch(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res[0])
      let city = document.querySelector(".yourCityName");
      city.innerHTML = res[0].title;

      //TEMPERATURA
      fetch(`https://www.metaweather.com/api/location/${res[0].woeid}`)
      .then((woeid) => woeid.json())
      .then((woeid) => {
        console.log(woeid.consolidated_weather[0]);
        let temp = document.querySelector(".yourCityTemp");
        temp.innerHTML = `${Math.round(woeid.consolidated_weather[0,1,2,3,4,5].the_temp)} ºC`;

        let bigIcon = document.querySelector(".yourCityIcon");
        bigIcon.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[0].weather_state_abbr}.svg" />`;
        //bigIcon.innerHTML = `<img src="../assets/images/${woeid.consolidated_weather[0].weather_state_abbr}.svg" />`;

        let cielo = document.querySelector(".cielo");
        cielo.innerHTML = `${(woeid.consolidated_weather[0].weather_state_name)}`;

        let humedad = document.querySelector(".humedad");
        humedad.innerHTML = `${woeid.consolidated_weather[0].humidity} %`;

        let maxTemp = document.querySelector(".maxTemp");
        maxTemp.innerHTML = `${Math.round(woeid.consolidated_weather[0].max_temp)} ºC`;

        let minTemp = document.querySelector(".minTemp");
        minTemp.innerHTML = `${Math.round(woeid.consolidated_weather[0].min_temp)} ºC`;

        let windSpeed = document.querySelector(".windSpeed");
        windSpeed.innerHTML = `${Math.round(woeid.consolidated_weather[0].wind_speed)} Km/h`;

        let precipitaciones = document.querySelector(".precipitaciones");
        precipitaciones.innerHTML = `${Math.round(woeid.consolidated_weather[0].predictability)} %`;

        let presionAire = document.querySelector(".airPre");
        presionAire .innerHTML = `${Math.round(woeid.consolidated_weather[0].air_pressure)} hPa`;

        //VERTICAL SCROLL
        //1 DAY
        let onedaynext = document.querySelector(".onewIcon");
        onedaynext.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[1].weather_state_abbr}.svg" />`;

        let fechaOneDay = document.querySelector(".fechaOneDay");
        let fechaOne = new Date(`${woeid.consolidated_weather[1].applicable_date}`);
        fechaOneDay.innerHTML = `${fechaOne.toLocaleDateString("es-ES")}`;

        let oneDayTemp = document.querySelector(".oneDayTemp");
        oneDayTemp.innerHTML = `${Math.round(woeid.consolidated_weather[1].the_temp)} ºC`;

        //https://www.metaweather.com/static/img/weather/hr.svg

        //2 DAY
        let twodaynext = document.querySelector(".twowIcon");
        twodaynext.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[2].weather_state_abbr}.svg" />`;

        let fechaTwoDay = document.querySelector(".fechaTwoDay");
        let fechaTwo = new Date(`${woeid.consolidated_weather[2].applicable_date}`);
        fechaTwoDay.innerHTML = `${fechaTwo.toLocaleDateString("es-ES")}`;

        let twoDayTemp = document.querySelector(".twoDayTemp");
        twoDayTemp.innerHTML = `${Math.round(woeid.consolidated_weather[2].the_temp)} ºC`;

        //3 DAY
        let threedaynext = document.querySelector(".threewIcon");
        threedaynext.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[3].weather_state_abbr}.svg" />`;

        let fechaThreeDay = document.querySelector(".fechaThreeDay");
        let fechaThree = new Date(`${woeid.consolidated_weather[3].applicable_date}`);
        fechaThreeDay.innerHTML = `${fechaThree.toLocaleDateString("es-ES")}`;

        let threeDayTemp = document.querySelector(".threeDayTemp");
        threeDayTemp.innerHTML = `${Math.round(woeid.consolidated_weather[3].the_temp)} ºC`;

        //4 DAY
        let fourdaynext = document.querySelector(".fourwIcon");
        fourdaynext.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[4].weather_state_abbr}.svg" />`;

        let fechaFourDay = document.querySelector(".fechaFourDay");
        let fechaFour = new Date(`${woeid.consolidated_weather[4].applicable_date}`);
        fechaFourDay.innerHTML = `${fechaFour.toLocaleDateString("es-ES")}`;

        let fourDayTemp = document.querySelector(".fourDayTemp");
        fourDayTemp.innerHTML = `${Math.round(woeid.consolidated_weather[4].the_temp)} ºC`;

        //5 DAY
        let fivedaynext = document.querySelector(".fivewIcon");
        fivedaynext.innerHTML = `<img src="https://www.metaweather.com/static/img/weather/${woeid.consolidated_weather[5].weather_state_abbr}.svg" />`;

        let fechaFiveDay = document.querySelector(".fechaFiveDay");
        let fechaFive = new Date(`${woeid.consolidated_weather[5].applicable_date}`);
        fechaFiveDay.innerHTML = `${fechaFive.toLocaleDateString("es-ES")}`;

        let fiveDayTemp = document.querySelector(".fiveDayTemp");
        fiveDayTemp.innerHTML = `${Math.round(woeid.consolidated_weather[5].the_temp)} ºC`;
      });

    })
  }
  let error = () =>{
    alert ('error!')
  }



  if(navigator.geolocation){
    
    navigator.geolocation.getCurrentPosition(succcess, error);
  }else{
      alert('Permite a esta app conocer la ubiación para mejorar el servicio :)')
  };

  //https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02
  //https://www.metaweather.com/api/location/search/?query=london

 
  
}

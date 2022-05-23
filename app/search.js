window.onload = () => {

  //BUSCAR CIUDAD
  let lupaIcon= document.querySelector(".lupaIcon");
  let barraBuscador=  document.querySelector(".form");
  let searchInput= document.querySelector(".buscarCiudad");
  let ciudadencontrada= document.querySelector(".vertical");
  // searchInput.addEventListener("click", (e) =>{
  //   //getWeatherData(searchInput.value)
  //   console.log(searchInput.value)
  // });
  
  lupaIcon.addEventListener("click", (e) =>{
    
    if(searchInput.value != ""){
      
      ///api/location/search/?query=london
      fetch(`https://www.metaweather.com/api/location/search/?query=${searchInput.value}`)
      .then((res) => res.json())
      .then((res) => {
  
        if(res.length == 1){
          let cityname = res[0].title;
          fetch(`https://www.metaweather.com/api/location/${res[0].woeid}`)
          .then((woeid) => woeid.json())
          .then((woeid) => {
            console.log(woeid.consolidated_weather[0]);

            let city = `
            <div class="cardDay">
            <h5 class="cityname">${cityname}</h5>
            <h6 class="onewIcon">${Math.round(woeid.consolidated_weather[0].max_temp)} ºC</h6>
            <h5 class="oneDayTemp"></h5>
            <button class="shareIcon"><img src="/assets/images/share.svg" alt="share icon"></button>
            <button class="shareIcon"><img src="/assets/images/ADD_ICON.svg" alt="add icon"></button>
        </div>
            `;
            ciudadencontrada.innerHTML = city;

            
          })
        }else{
          alert("no tengo datos sobre esa ciudad");
          searchInput.value = "";
        }

      })

    }else{
      alert("introduce una ciudad")
    }


  });


    



   }

           //DETALLE CIUDAD > HOME
    //   city.addEventListener("click", (i){
    //     if(searchInput.value != title);
    //   });

    // city.addEventListener("click", (i){
    //   if('<h5 class="cityname">${cityname}</h5>'.value = cityname){
    //     fetch(`https://www.metaweather.com/api/location/search/?query=${searchInput.value}`)
    //     .then((woeid) => woeid.json())
    //           .then((woeid) => {
    //             console.log(woeid.consolidated_weather[0]);
    // });
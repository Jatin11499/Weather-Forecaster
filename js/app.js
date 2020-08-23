window.addEventListener('load',() => {
    let long;
    let lat;
    let tempDesc = document.querySelector('.temperature-description');
    let tempDeg = document.querySelector('.temperature-degree');
    let locTime = document.querySelector('.location-timezone');
    let degSec = document.querySelector('.degree-section');
    let degSecSpan = document.querySelector('.degree-section span span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f1c185659dbdddd44cd4444abc2f4a63`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const temp = data.main.temp;
                const desc = data.weather[0].description;
                const icon = data.weather[0].icon;
                let path = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

                tempDeg.textContent = (Math.floor((temp - 273.15)*100))/100;
                tempDesc.textContent = desc;
                locTime.textContent = data.name + "/" + data.sys.country;
                document.querySelector('.weather-icon').src = path;

                degSec.addEventListener('click',() => {
                    if(degSecSpan.textContent == 'C'){
                        degSecSpan.textContent = 'F';
                        tempDeg.textContent = (tempDeg.textContent * 9/5) + 32;
                    }
                    else{
                        degSecSpan.textContent = 'C';
                        tempDeg.textContent = (tempDeg.textContent - 32) * 5/9;
                    }
                });
            });
        });
    }

    else{
        alert("Please enable geolocation in the browser.");
    }
});
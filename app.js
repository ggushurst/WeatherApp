function getData(){
    window.addEventListener('load', ()=> {
        let long;
        let lat;
        let currentTemperatureDescription = document.querySelector(".current-temperature-description h3");
        let currentTemperatureDegree = document.querySelector(".current-temperature-degree");
        let currentLocationTimezone = document.querySelector(".current-location-timezone");
        let currentTemperatureSection = document.querySelector(".current-temperature");
        let currentTemperatureSpan = document.querySelector(".current-temperature span");
        let futureTemperatureDay0 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day0 > div.future-temp-description h3")
        let futureTemperatureDay1 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day1 > div.future-temp-description h3")
        let futureTemperatureDay2 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day2 > div.future-temp-description h3")
        let futureTemperatureDay3 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day3 > div.future-temp-description h3")
        let futureTemperatureDay4 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day4 > div.future-temp-description h3")
        let futureTemperatureDay5 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day5 > div.future-temp-description h3")
        let futureTemperatureDay6 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day6 > div.future-temp-description h3")
        let futureTemperatureDay7 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day7 > div.future-temp-description h3")
        // let futureDescriptionDay0 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day0 > div.future-temp-description h4")
        // let futureDescriptionDay1 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day1 > div.future-temp-description h4")
        // let futureDescriptionDay2 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day2 > div.future-temp-description h4")
        // let futureDescriptionDay3 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day3 > div.future-temp-description h4")
        // let futureDescriptionDay4 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day4 > div.future-temp-description h4")
        // let futureDescriptionDay5 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day5 > div.future-temp-description h4")
        // let futureDescriptionDay6 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day6 > div.future-temp-description h4")
        // let futureDescriptionDay7 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day7 > div.future-temp-description h4")
        let futureIconDay0 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day0 > canvas")
        let futureIconDay1 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day1 > canvas")
        let futureIconDay2 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day2 > canvas")
        let futureIconDay3 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day3 > canvas")
        let futureIconDay4 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day4 > canvas")
        let futureIconDay5 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day5 > canvas")
        let futureIconDay6 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day6 > canvas")
        let futureIconDay7 = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day7 > canvas")
        console.log(process.env.GOOGLE_API_KEY);


        if(navigator.geolocation) {
            currentLocationTimezone.textContent = "case";
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
                currentLocationTimezone.textContent = "Testing124";
                

                const proxy = "https://enigmatic-ravine-15853.herokuapp.com/";
                const api = `${proxy}https://api.darksky.net/forecast/e0d2bac8619368c2036491a4aa790491/${lat},${long}`;
                currentLocationTimezone.textContent = 'Testing123';

                fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    //Set DOM Elements from the API
                    currentTemperatureDegree.textContent = temperature;
                    currentTemperatureDescription.textContent = summary;
                    currentLocationTimezone.textContent = data.timezone;

                    //Setting future elements
                    setFutureTempDescriptions(futureTemperatureDay0, futureIconDay0, "0", data);
                    setFutureTempDescriptions(futureTemperatureDay1, futureIconDay1, "1", data);
                    setFutureTempDescriptions(futureTemperatureDay2, futureIconDay2, "2", data);
                    setFutureTempDescriptions(futureTemperatureDay3, futureIconDay3, "3", data);
                    setFutureTempDescriptions(futureTemperatureDay4, futureIconDay4, "4", data);
                    setFutureTempDescriptions(futureTemperatureDay5, futureIconDay5, "5", data);
                    setFutureTempDescriptions(futureTemperatureDay6, futureIconDay6, "6", data);
                    setFutureTempDescriptions(futureTemperatureDay7, futureIconDay7, "7", data);
                    
                    

                    //Formula for converting F to C (temperature)
                    let celsius = Math.floor((temperature - 32) * (5 / 9));
                    //Set ICON from skycons
                    setIcons(icon, document.querySelector('.icon'));

                    //Switch between C & F when clicked
                    currentTemperatureSection.addEventListener('click', ()=> {
                        if(currentTemperatureSpan.textContent === "F") {
                            currentTemperatureSpan.textContent = "C";
                            currentTemperatureDegree.textContent = celsius;
                        }
                        else {
                            currentTemperatureSpan.textContent = "F";
                            currentTemperatureDegree.textContent = temperature;
                        }
                    })
                })
            })

            setDayName(0);
            setDayName(1);
            setDayName(2);
            setDayName(3);
            setDayName(4);
            setDayName(5);
            setDayName(6);
            setDayName(7);
            // daily.data[""0""].apparentTemperatureMin
        }

        function setFutureTempDescriptions(dayTemp, dayIcon, day, data) {
            const futureDayData = data.daily.data[day];
            const {temperatureHigh, temperatureLow, summary, icon} = futureDayData;
            console.log(temperatureHigh);
            dayTemp.textContent = "High: " + temperatureHigh + " Low: " + temperatureLow;
            // dayDesc.textContent = summary;
            setIcons(icon, dayIcon);
        }

        function setIcons(icon, iconID) {
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }

        function getDayName (dateStr, locale) {
            var date = new Date(dateStr);
            return date.toLocaleDateString(locale, {weekday: 'long'});
        }

        function setDayName(num) {
            var day = new Date();
            var dd = String(day.getDate() + num).padStart(2, '0');
            var mm = String(day.getMonth() + 1).padStart(2, '0');
            var yyyy = day.getFullYear();
            day = mm + "/" + dd + "/" + yyyy;
            var dayName = document.querySelector("body > div.future-temperatures > div.future-temperature-description-day" + num + " > div.day-of-the-week");
            dayName.textContent = getDayName(day, 'en-us');
        }
            
    })
}

let getWeatherData = getData();
exports.getWeatherData = getWeatherData;
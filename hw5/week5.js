// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let weatherButton = document.querySelector(`button`) 
  
    // When the "get weather" button is clicked:
    weatherButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let location = document.querySelector(`#location`)
      let days = document.querySelector(`#days`)
      // - Get the user-entered location from the element's value
      let locationDetail = location.value 
      let dayDetail = days.value 
  
      // - Check to see if the user entered anything; if so:
      if (locationDetail.length>0 && dayDetail.length>0) {
  
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=7093341bf2494500ae9155303212704&q=${locationDetail}&days=${dayDetail}`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json() 
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the interpreted location, current weather conditions, the forecast as three separate variables
        let locationData = json.location
        let weatherCurrent = json.current 
        let weatherForecast = json.forecast.forecastday 

        // - Continue the recipe yourself!
        // <---- W5 LAB END. BEGIN W5 HW ---->
        
        // get a reference to the HTML element to which we are going to add the user-entered location
        let currentOutput = document.querySelector(`.current`)

        // insert HTML for current weather for user-entered location
        currentOutput.insertAdjacentHTML(`beforeend`,`
            <div class="text-center space-y-2">
                <div class="font-bold text-3xl">Current Weather for ${locationData.name}, ${locationData.region}</div>
                <div class="font-bold">
                    <img src="https:${weatherCurrent.condition.icon}" class="inline-block">
                    <span class="temperature">${weatherCurrent.temp_f}</span>° 
                    and
                    <span class="conditions">${weatherCurrent.condition.text}</span>
                </div>
            </div>
        `)

        // loop through the json forecast array 
        for (i=0; i < weatherForecast.length; i++) {

            // create a variable to store each day's forecast in memory
            let forecastElement = weatherForecast[i]

            // get a reference to the HTML element to which we are going to add user-entered # of days forecast
            let forecastOutput = document.querySelector(`.forecast`) 

            // insert HTML for the user-entered number of days forecast
            forecastOutput.insertAdjacentHTML(`beforeend`,`
                <div class="text-center space-y-8">
                    <div class="font-bold text-3xl">${dayDetail} Day Forecast</div>
                    <div>
                        <img src="https:${forecastElement.day.condition.icon}" class="mx-auto">
                        <h1 class="text-2xl text-bold text-gray-500">${forecastElement.date}</h1>
                        <h2 class="text-xl">High ${forecastElement.day.maxtemp_f}° – Low ${forecastElement.day.mintemp_f}°</h2>
                        <p class="text-gray-500">${forecastElement.day.condition.text}</h1>
                    </div>
                </div>  
            `)
        }

      }
    })
  })
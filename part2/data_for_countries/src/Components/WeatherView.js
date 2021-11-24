const WeatherView = (props) => {
    let weatherDiv = <div></div>
    console.log("in weatherview",props.weatherData, Object.keys(props.weatherData).length)
    
    if(Object.keys(props.weatherData).length > 0 ){
        console.log(
            "weather data greater than 0"
        )
        weatherDiv = (<h2>Weather: {props.weatherData.weather[0].description}</h2>)
    }
    return weatherDiv
  }

export default WeatherView;
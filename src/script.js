const BaseURL = "http://api.weatherapi.com/v1/"
const API_Key = '5ad3c720a98944c18cb41011232006'

async function getWeatherData(City = 'Dhaka', Lang = 'bn')
{            
    const CurrentURL = BaseURL + 'forecast.json?q='+City+'&lang='+Lang+'&key='+API_Key

    const response = await axios.get(CurrentURL)
    // console.log(response.data)

    if(response.status != 200){
        Swal.fire('Something went wrong!')
    }
    else{
        document.getElementById('city').innerHTML = response.data.location.name
        document.getElementById('country').innerHTML = response.data.location.country
        document.getElementById('tz').innerHTML = response.data.location.tz_id
        document.getElementById('lat').innerHTML = response.data.location.lat
        document.getElementById('lon').innerHTML = response.data.location.lon
        document.getElementById('lt').innerHTML = response.data.location.localtime

        document.getElementById('skyconditiontxt').innerHTML = response.data.current.condition.text
        document.getElementById('skyconditionimg').innerHTML = '<img src="'+response.data.current.condition.icon+'">'
        document.getElementById('tempc').innerHTML = response.data.current.temp_c + 'C'
        document.getElementById('tempf').innerHTML = response.data.current.temp_f + 'F'
        document.getElementById('feelslikec').innerHTML = response.data.current.feelslike_c + 'C'
        document.getElementById('feelslikef').innerHTML = response.data.current.feelslike_f + 'F'
        document.getElementById('humidity').innerHTML = response.data.current.humidity

        // if(response.data.current.is_day)
        //     document.getElementById('now').innerHTML = 'এখন দিন'
        // else
        //     document.getElementById('now').innerHTML = 'এখন রাত'

        document.getElementById('uv').innerHTML = response.data.current.uv
        document.getElementById('wind_kph').innerHTML = response.data.current.wind_kph+' KPH'
        document.getElementById('wind_mph').innerHTML = response.data.current.wind_mph + ' MPH'

        
        document.getElementById('sunrise').innerHTML = response.data.forecast.forecastday[0].astro.sunrise
        document.getElementById('sunset').innerHTML = response.data.forecast.forecastday[0].astro.sunset
        document.getElementById('moonrise').innerHTML = response.data.forecast.forecastday[0].astro.moonrise
        document.getElementById('moonset').innerHTML = response.data.forecast.forecastday[0].astro.moonset
        document.getElementById('moon_phase').innerHTML = response.data.forecast.forecastday[0].astro.moon_phase
        document.getElementById('moon_illumination').innerHTML = response.data.forecast.forecastday[0].astro.moon_illumination

        document.getElementById('f_maxtemp_c').innerHTML = response.data.forecast.forecastday[0].day.maxtemp_c +'C'
        document.getElementById('f_maxtemp_f').innerHTML = response.data.forecast.forecastday[0].day.maxtemp_f + 'F'
        document.getElementById('f_mintemp_c').innerHTML = response.data.forecast.forecastday[0].day.mintemp_c + "C"
        document.getElementById('f_mintemp_f').innerHTML = response.data.forecast.forecastday[0].day.mintemp_f + 'F'
        document.getElementById('f_avgtemp_c').innerHTML = response.data.forecast.forecastday[0].day.avgtemp_c + 'C'
        document.getElementById('f_avgtemp_f').innerHTML = response.data.forecast.forecastday[0].day.avgtemp_f + 'F'
        document.getElementById('f_maxwind_kph').innerHTML = response.data.forecast.forecastday[0].day.maxwind_kph + 'KPH'
        document.getElementById('f_maxwind_mph').innerHTML = response.data.forecast.forecastday[0].day.maxwind_mph + 'MPH'
        
        document.getElementById('f_skycondition_text').innerHTML = response.data.forecast.forecastday[0].day.condition.text
        document.getElementById('f_skycondition_img').innerHTML = '<img src="'+response.data.forecast.forecastday[0].day.condition.icon+'">'
        
        document.getElementById('f_avg_humidity').innerHTML = response.data.forecast.forecastday[0].day.avghumidity

        // let { Forecast } = response.data.forecast.forecastday[0].hour
        // console.log(Forecast in response.data.forecast.forecastday[0].hour)
        // for(Data in response.data.forecast.forecastday[0].date)
        // {
        //     console.log(Data.condition['text'])
        // }
        let Array = response.data.forecast.forecastday[0].hour.reverse()
        // console.log(Forecast)
        for(Key in Array)
        {
            let html = "<tr><td>"+Array[Key].time.split(' ')[1]+"</td><td>"+Array[Key].condition.text+"</td><td><img src='"+Array[Key].condition.icon+"'></td></tr>"
            document.getElementById('forecast').insertAdjacentHTML('afterend', '<tr><td>'+html+'</td</tr>')
            // console.log(Array[Key].condition.text)
        }
        
    }            
}

getWeatherData()


document.getElementById('FormBtn').addEventListener('click', ()=>{
    let City = document.getElementById('InputCity').value
    getWeatherData(City)
    
})
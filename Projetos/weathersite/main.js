document.addEventListener("DOMContentLoaded", () => {    
    const inputCity = document.getElementById('input-city')
    const txtCel = document.getElementById('cel')
    const txtFah = document.getElementById('fah')
    const txtHumi = document.getElementById('humidity')
    const txtDescr = document.getElementById('description')
    const apiKey = 'd6e3a416459d4b7daf7b6b0854bfdde6'

    async function fetchWeather(city) {

        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}`
            //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&lang=pt_br`
            const response = await fetch(apiUrl)
            if (!response.ok) {
                throw new Error("Could not fetch weather data")
            }
            if (city == 'City') {
                throw new Error("Please select a country or city!")
            }          
            console.log(apiUrl)  
            return await response.json()
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

    function displayWeather({ name: city, main: { temp, humidity }, weather: [{ description }] }) {
        const tempCelsius = temp - 273.15
        const tempFahrenheit = (tempCelsius / 0.5566) + 32

        txtCel.textContent = `Celsius ${tempCelsius.toFixed(1)}°`
        txtFah.textContent = `Fahrenheit ${tempFahrenheit.toFixed(1)}°`
        txtHumi.textContent = `Humidity ${humidity}%`
        txtDescr.textContent = description
        changeBack(tempCelsius)
    }

    async function temp() {
        try {
            const city = inputCity.value.trim()
            if (!city) {
                alert("Please enter a valid city name")
            }
            const weather = await fetchWeather(city)
            displayWeather(weather)            
        }

        catch (error) {
            alert("Could not fetch weather data. Please try again later.");
        }
    }

    const changeBack = (temperature) => {        
        const backG = document.getElementById('bd')  
        for(const range of temperatureRange) {
            if(temperature >= range.min && temperature <= range.max){
                backG.style.background = range.color
                break;
            }
        }
    }

    const temperatureRange = [
        {min: 29, max: 100, color: 'linear-gradient(162deg, rgba(255,209,0,1) 18%, rgba(255,112,0,1) 51%)'},
        {min: 18, max: 29, color:'linear-gradient(151deg, rgba(224,255,0,1) 17%, rgba(0,164,255,1) 26%)'},
        {min: 10, max: 18, color: 'linear-gradient(150deg, rgba(4,157,191,1) 9%, rgba(5,219,242,1) 34%)'},
        {min: 0, max: 10, color: 'linear-gradient(185deg, rgba(61,115,135,1) 0%, rgba(139,187,217,1) 39%)'},
        {min: -100, max: 0, color: 'linear-gradient(0deg, rgba(129,138,150,1) 9%, rgba(223,225,232,1) 57%)'}

    ]

    document.getElementById('find').addEventListener('click', temp)
})



async function fetchCountries() {
    const url = 'https://country-state-city-search-rest-api.p.rapidapi.com/allcountries';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '99d14885f1msh7d2906601274b6cp1f4abajsna3374652a9f6',
            'X-RapidAPI-Host': 'country-state-city-search-rest-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const inputCountry = document.getElementById('input-country')

        result.forEach(country => {
            const option = document.createElement('option')
            option.value = country.isoCode
            option.text = country.name
            inputCountry.add(option)
        })
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('input-country').addEventListener('change', function () {
    if (this.value !== 'Country') {
        const selectedCountry = this.options[this.selectedIndex].text
        //fetchCities(this.value)
        document.getElementById('country').textContent = selectedCountry
    }
})

async function fetchCities(id_country) {
    const url = `https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode?countrycode=${id_country}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '99d14885f1msh7d2906601274b6cp1f4abajsna3374652a9f6',
            'X-RapidAPI-Host': 'country-state-city-search-rest-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const inputCity = document.getElementById('input-city')
        inputCity.innerHTML = '';

        result.forEach(cities => {
            const option = document.createElement('option')
            option.value = cities.name
            option.text = cities.name
            inputCity.add(option)
        })
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('input-city').addEventListener('change', function () {
    document.getElementById('city').textContent = this.value
})

//window.document.onload = fetchCities
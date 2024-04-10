document.addEventListener("DOMContentLoaded", () => {
    const inputCountry = document.getElementById('input-country')
    const inputCity = document.getElementById('input-city')
    const txtCel = document.getElementById('cel')
    const txtFah = document.getElementById('fah')
    const apiKey = 'd6e3a416459d4b7daf7b6b0854bfdde6'

    async function fetchWeather(city) {

        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}`
            const response = await fetch(apiUrl)
            if (!response.ok) {
                throw new Error("Could not fetch weather data")
            }
            if (city == 'City') {
                throw new Error("Please select a country or city!")
            }

            return await response.json()
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

    function displayWeather({ name: city, main: { temp }, weather: [{ description }] }) {
        const tempCelsius = temp - 273.15
        const tempFahrenheit = (tempCelsius / 0.5566) + 32

        txtCel.textContent = `Celsius ${tempCelsius.toFixed(2)}°`
        txtFah.textContent = `Fahrenheit ${tempFahrenheit.toFixed(2)}°`
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

document.getElementById('input-country').addEventListener('click', function () {
    const selectedCountry = this.options[this.selectedIndex].text
    fetchCities(this.value)
    document.getElementById('country').textContent = selectedCountry
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

document.getElementById('input-city').addEventListener('click', function () {
    document.getElementById('city').textContent = this.value
})


window.onload = fetchCountries

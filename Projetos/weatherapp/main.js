document.addEventListener("DOMContentLoaded", () => {
    const inputCountry = document.getElementById('input-country')
    const inputCity = document.getElementById('input-city')
    const apiKey = 'd6e3a416459d4b7daf7b6b0854bfdde6'

    async function temperatura() {
        const txtCel = document.getElementById('cel')
        const txtFah = document.getElementById('fah')
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}`
        const response = await fetch(apiUrl)

        if (!response.ok) {
            alert("Could not fetch weather data")
            throw new Error("Could not fetch weather data")
        }

        const resposta = await response.json()
        const { name: city,
            main: { temp, humidity },
            weather: [{ description, id }] } = resposta

        
        const tempCel = temp - 273.15
        const tempFah = (tempCel / 0.5556) + 32 
        txtCel.textContent = `Celsius ${tempCel.toFixed(2)}°`
        txtFah.textContent = `Fahrenheit ${tempFah.toFixed(2)}°`
    }

    document.getElementById('find').addEventListener('click', temperatura)    
})

const options = {
	method: 'GET',
	hostname: 'countries-states-and-cities.p.rapidapi.com',
	port: null,
	path: '/countries',
	headers: {
		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
		'X-RapidAPI-Host': 'countries-states-and-cities.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();
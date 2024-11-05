const apikey = "600cb25985b4f57b1cd381b683d66c1c";
        const api = `https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${apikey}&q=`;
        
        const input = document.querySelector(".search input");
        const btn = document.querySelector(".search i");
        const image = document.querySelector("#weather-image");
        const weather1 = document.querySelector(".weather");
        const error = document.querySelector(".error");

        // Function to fetch weather by city name
        async function fetchWeatherByCity(city) {
            const response = await fetch(api + city);
            const data = await response.json();
            displayWeather(data);
        }

        // Function to fetch weather by coordinates
        async function fetchWeatherByCoords(lat, lon) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`);
            const data = await response.json();
            displayWeather(data);
        }

        // Function to display weather
        function displayWeather(data) {
            if (data.cod !== 200) { // Show error if city not found
                error.style.display = "block";
                weather1.style.display = "none";
            } else {
                error.style.display = "none";
                weather1.style.display = "block";

                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg; C";
                document.querySelector("#wind-speed").innerHTML = data.wind.speed + " km/h";
                document.querySelector("#humid").innerHTML = data.main.humidity + "%";

                if (data.weather[0].main == "Clouds") {
                    image.src = "cloud.png";
                } else if (data.weather[0].main == "Clear") {
                    image.src = "sun.png";
                } else if (data.weather[0].main == "Rain") {
                    image.src = "rainy-day.png";
                } else if (data.weather[0].main == "Drizzle") {
                    image.src = "drizzle.png";
                } else if (data.weather[0].main == "Mist") {
                    image.src = "mist.png";
                } else if (data.weather[0].main == "Snow") {
                    image.src = "snowy.png";
                } else if (data.weather[0].main == "Haze") {
                    image.src = "haze.png";
                }
            }
        }

        // Get user's current location and fetch weather
        function getCurrentLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherByCoords(latitude, longitude);
                    },
                    (error) => {
                        console.log("Error getting location:", error);
                        alert("Unable to retrieve your location. Please search manually.");
                    }
                );
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        // Event listener for search button
        btn.addEventListener("click", () => {
            fetchWeatherByCity(input.value);
            input.value.innerHTML = ""
        });

        // Event listener for Enter key in search input
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                btn.click();
            }
        });

        // Get current location weather on page load
        window.addEventListener("load", getCurrentLocationWeather);
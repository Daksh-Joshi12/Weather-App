 const API_KEY = '608aad6a8053cc58624024b3565e8bbe';
        const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

        function getWeatherIcon(weatherMain) {
            const icons = {
                'Clear': '☀️',
                'Clouds': '☁️',
                'Rain': '🌧️',
                'Drizzle': '🌦️',
                'Thunderstorm': '⛈️',
                'Snow': '❄️',
                'Mist': '🌫️',
                'Smoke': '🌫️',
                'Haze': '🌫️',
                'Fog': '🌫️'
            };
            return icons[weatherMain] || '🌤️';
        }

        function showElement(id) {
            document.getElementById(id).classList.remove('d-none');
        }

        function hideElement(id) {
            document.getElementById(id).classList.add('d-none');
        }

        function hideError() {
            hideElement('error');
        }

        async function searchWeather() {
            const city = document.getElementById('cityInput').value.trim();
            
            if (!city) {
                showError('Please enter a city name');
                return;
            }

            hideElement('weatherInfo');
            hideElement('error');
            showElement('loading');

            try {
                const response = await fetch(
                    `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
                );

                if (!response.ok) {
                    throw new Error('City not found');
                }

                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                showError('City not found. Please check the spelling and try again.');
            } finally {
                hideElement('loading');
            }
        }

        function displayWeather(data) {
            document.getElementById('cityName').textContent = 
                `${data.name}, ${data.sys.country}`;
            
            document.getElementById('weatherIcon').textContent = 
                getWeatherIcon(data.weather[0].main);
            
            document.getElementById('temperature').textContent = 
                `${Math.round(data.main.temp)}°C`;
            
            document.getElementById('description').textContent = 
                data.weather[0].description;
            
            document.getElementById('feelsLike').textContent = 
                `${Math.round(data.main.feels_like)}°C`;
            
            document.getElementById('humidity').textContent = 
                `${data.main.humidity}%`;
            
            document.getElementById('windSpeed').textContent = 
                `${data.wind.speed} m/s`;
            
            document.getElementById('pressure').textContent = 
                `${data.main.pressure} hPa`;

            showElement('weatherInfo');
            
            document.getElementById('weatherInfo').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }

        function showError(message) {
            document.getElementById('errorMessage').textContent = message;
            showElement('error');
        }
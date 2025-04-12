require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());



app.get('/weather', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'city name is required' });
    }
    https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`);
        const weatherData = {
            temperature: response.data.main.temp,
            condition: response.data.weather[0].main,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            city: response.data.name,
            country: response.data.sys.country
        };
        res.json(weatherData);
    }catch(error){
        if(error.response && error.response.status === 404){
            res.status(404).json({error: 'City not found'});
        }
        else{
            res.status(500).json({error: 'Error fetching weather data'});
        }
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
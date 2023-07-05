import axios from "axios";
const baseUrl = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}`;

const getWeather = (country) => {
    return axios
        .get(`${baseUrl}&q=${country.name.common}`)
        .then((response) => response.data);
};

const WeatherService = { getWeather };

export default WeatherService;

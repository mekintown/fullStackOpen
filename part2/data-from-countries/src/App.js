import { useState, useEffect } from "react";
import CountryService from "./service/countries";
import WeatherService from "./service/weather";

const Form = ({ inputValue, setInputValue }) => {
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <form>
            <label htmlFor="countries">Find countries</label>
            <input
                type="text"
                placeholder="Countries"
                id="countries"
                value={inputValue}
                onChange={handleInputChange}
            ></input>
        </form>
    );
};

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        WeatherService.getWeather(country).then((responseWeather) => {
            setWeather(responseWeather);
        });
    }, [country]);

    if (!weather) {
        return <div>Loading weather data...</div>;
    }

    return (
        <div>
            <h2>Weather</h2>
            <p>temperature {weather.current.temp_c} C</p>
            <p>wind {weather.current.wind_mph} mph</p>
        </div>
    );
};

const Country = ({ country, isOnlyCountry }) => {
    const [isShow, setIsShow] = useState(false);
    const imgStyle = {
        maxWidth: "120px",
    };
    const handleShowClick = () => {
        setIsShow(!isShow);
    };

    useEffect(() => {
        if (isOnlyCountry) {
            setIsShow(true);
        }
    }, [isOnlyCountry]);

    return (
        <div>
            <p>{country.name.common}</p>
            <button onClick={handleShowClick}>
                {isShow ? "Hide" : "Show"} details
            </button>
            {isShow && (
                <>
                    <p>capital {country.capital}</p>
                    <p>area {country.area}</p>

                    <h3>languages:</h3>
                    <ul>
                        {Object.values(country.languages).map((language) => (
                            <li>{language}</li>
                        ))}
                    </ul>
                    <img
                        src={country.flags.svg}
                        alt="Flag"
                        style={imgStyle}
                    ></img>
                    <Weather country={country} />
                </>
            )}
        </div>
    );
};

const Countries = ({ inputValue, allCountries }) => {
    if (!inputValue) return;
    const filteredCountries = allCountries.filter(
        (country) =>
            inputValue === "" ||
            country.name.common.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (filteredCountries.length === 1) {
        console.log("yeah");
        return <Country country={filteredCountries[0]} isOnlyCountry={true} />;
    }
    return filteredCountries.map((country) => (
        <Country country={country} key={country.id} />
    ));
};

const App = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        CountryService.getAll().then((initialCountries) =>
            setAllCountries(initialCountries)
        );
    }, []);
    return (
        <div>
            <Form inputValue={inputValue} setInputValue={setInputValue} />
            <Countries inputValue={inputValue} allCountries={allCountries} />
        </div>
    );
};
export default App;

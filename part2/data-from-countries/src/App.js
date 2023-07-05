import { useState, useEffect } from "react";
import CountryService from "./service/countries";

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

const Country = ({ country, isOnlyCountry }) => {
    const imgStyle = {
        maxWidth: "120px",
    };
    if (isOnlyCountry) {
        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>

                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map((language) => (
                        <li>{language}</li>
                    ))}
                </ul>
                <img src={country.flags.svg} alt="Flag" style={imgStyle}></img>
            </div>
        );
    }
    return <p>{country.name.common}</p>;
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
    const [countries, setCountries] = useState([]);
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

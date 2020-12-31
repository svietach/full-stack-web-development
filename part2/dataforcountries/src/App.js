import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function App() {
    const [searchValue, setSearchValue] = useState('');
    const [countries, setCountries] = useState([]);
    const [capitalWeather, setCapitalWeather] = useState({});

    const searchCountry = async (name) => {
        const data = await axios.get('https://restcountries.eu/rest/v2/name/' + name);
        if (data.data && data.data.length) {
            if (data.data.length === 1) {
                const weatherData = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${data.data[0].capital}`);
                console.log(weatherData.data);
                setCapitalWeather(weatherData.data);
            }
            setCountries(data.data);
        }
    }

    const onChangeHandler = (event) => {
        setSearchValue(event.target.value);
        searchCountry(event.target.value);
    }

    const showHandler = (name) => {
        searchCountry(name);
    }


    return (
        <div>
            find countries: <input value={searchValue} onChange={onChangeHandler} />
            {(countries.length && countries.length > 1) ? countries.map((country) => {
                return (
                    <>
                        <p>{country.name} <button type="buttom" onClick={() => {
                            showHandler(country.name);
                        }}> show</button></p>

                        <br />
                    </>
                );
            }) : null}
            {
                (countries.length && countries.length === 1) ? countries.map((country) => {
                    return (
                        <>
                            <h1>{country.name}</h1>
                            <br />
                            <p>capital: {country.capital}</p>
                            <br />
                            <p>population: {country.population}</p>
                            <br />
                            <h1>languages</h1>
                            <br />
                            <ul>
                                {country.languages.map((language) => {
                                    return (
                                        <li>{language.name}</li>
                                    );
                                })}
                            </ul>
                            <br />
                            <img src={country.flag} width="200" height="100" />
                            {!!country.capital && !!capitalWeather && (
                                <div>
                                    <h1>Weather in {country.capital}</h1>
                                    <p>temperature: {capitalWeather.current.temperature}</p><br />
                                    <img src={capitalWeather.current.weather_icons[0]} width="200" height="100" /><br />
                                    <p>wind: {capitalWeather.current.wind_speed} mph direction {capitalWeather.current.wind_dir}</p><br />
                                </div>
                            )}
                        </>
                    );
                }) : null
            }
            { !countries.length && <p>Too many matches, specify another filter</p>}
        </div >
    );
}
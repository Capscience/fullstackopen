import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css';


const Search = ({search, changeHandler}) => {
    return (
        <>
            Find countries:<br/>
            <input value={search}
                   onChange={changeHandler}
            />
        </>
    )
}

const Countries = ({countries, search, handleClick}) => {
    console.log('Component', countries, countries.length)
    if (countries.length > 10) {
        return (
            <>
                <p>
                    Too many matches, specify another filter
                </p>
            </>
        )
    } else if (countries.length === 0) {
        return (
            <>
                <p>
                    No matches found
                </p>
            </>
        )
    } else if (countries.length === 1) {
        return (
            <>
                <CountryData country={countries[0]} />
            </>
        )
    } else {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Country name</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map(country => (
                            <tr key={country.cca2}>
                                <td>{country.name.common}</td>
                                <td>
                                    <button onClick={handleClick}
                                            value={countries.indexOf(country)}>
                                        {'Show'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
    }
}

const CountryData = ({country}) => {
    console.log('Component', country)
    if (country === null) {
        return null
    } else {
        return (
            <>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}<br/>
                Area: {country.area} square kilometers</p>
                <Languages languages = {country.languages} />
                <img src={country.flags.png} />
            </>

        )
    }
}

const Weather = ({weather}) => {
    if (weather === null) {
        return null
    } else {
        return (
            <>
                <h3>{weather.location.name}</h3>
                <p>
                    Temperature (C): {weather.current.temp_c}<br/>
                    Wind (m/s): {(weather.current.wind_kph / 3.6).toFixed(1)}
                </p>
                <img src={weather.current.condition.icon} />
            </>
        )
    }
}

const Languages = ({languages}) => {
    console.log(languages)
    return (
        <>
            <p><b>Languages:</b></p>
            <ul>
                {Object.entries(languages).map(([key, value]) => (
                    <li key={key}>{value}</li>
                ))}
            </ul>
        </>
    )
}

const App = () => {
    const baseUrl = 'https://restcountries.com/v3.1/all'
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [weather, setWeather] = useState(null)

    const getCountries = () => {
        axios.get(baseUrl)
            .then(response => {
                console.log(search === '')
                setCountries(
                    response.data.filter(country => {
                        if (search) {
                            return country.name.common.toLowerCase().includes(search.toLowerCase())
                        } else {
                            return true
                        }
                    })
                )
            })
            .catch(error => {
                console.log('Getting countries from API failed!', error)
            })
    }

    const handleClick = (event) => {
        console.log(event)
        setCountries(
            [countries[event.target.value]]
        )
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        getCountries()
    }

    const updateWeather = (city) => {
        const api_key = process.env.REACT_APP_API_KEY
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`)
            .then(response => setWeather(response.data))
            .catch(error => console.log('updateWeather', error))
    }

    useEffect(() => {
        getCountries()
    }, [search])

    useEffect(() => {
        if (countries.length === 1) {
            updateWeather(countries[0].capital)
        } else {
            setWeather(null)
        }
    }, [countries])

    return (
        <div>
            <Search search={search}
                    changeHandler={handleSearchChange}
            />
            <Countries countries={countries}
                       search={search}
                       handleClick={handleClick}
            />
            <Weather weather={weather} />
        </div>
    );
}

export default App;

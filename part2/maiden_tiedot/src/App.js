import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/country'
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


const Countries = ({countries, search}) => {
    console.log(countries)
    if (countries.length > 10) {
        return (
            <>
                <p>
                    Too many matches, specify another filter
                </p>
            </>
        )
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td scope="col">Country name</td>
                        <td scope="col"></td>
                    </tr>
                </thead>
                <tbody>
                    {countries.filter(country => {
                        country.name.toLowerCase().includes(search.toLowerCase())
                    }).map(country => {
                            <tr key={country.id}>
                                <td>{country.name}</td>
                                <td></td>
                            </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}


const App = () => {
    const baseUrl = 'https://restcountries.com/v3.1/all'
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    console.log('Refresh')

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            <Search search={search}
                    changeHandler={handleSearchChange}
            />
            <Countries countries={countries}
                       search={search}
            />
        </div>
    );
}

export default App;

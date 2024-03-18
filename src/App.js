import React, { useState, useEffect } from 'react';
import { MainButton, WebAppProvider, useWebApp } from '@vkruglikov/react-telegram-web-app';

const CountryRegionCitySelect = () => {
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const webApp = useWebApp()

    useEffect(() => {
        fetch('countries.json')
            .then(response => response.json())
            .then(data => setCountries(data));
    }, []);

    const handleCountryChange = (e) => {
        const selectedCountryId = e.target.value;
        setSelectedCountry(selectedCountryId);
        setSelectedRegion('');
        setSelectedCity('');
        if (selectedCountryId) {
            fetch(`countries/${selectedCountryId}/regions.json`)
                .then(response => response.json())
                .then(data => setRegions(data));
        } else {
            setRegions([]);
            setCities([]);
        }
    };

    const handleRegionChange = (e) => {
        const selectedRegionId = e.target.value;
        setSelectedRegion(selectedRegionId);
        setSelectedCity('');
        if (selectedRegionId) {
            fetch(`countries/${selectedCountry}/${selectedRegionId}.json`)
                .then(response => response.json())
                .then(data => setCities(data));
        } else {
            setCities([]);
        }
    };

    return (
        <div>
            <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Выберите страну</option>
                {countries.map(country => (
                    <option key={country.country_id} value={country.country_id}>
                        {country.title_ru}
                    </option>
                ))}
            </select>

            <select value={selectedRegion} onChange={handleRegionChange}>
                <option value="">Выберите регион</option>
                {regions.map(region => (
                    <option key={region.region_id} value={region.region_id}>
                        {region.title_ru}
                    </option>
                ))}
            </select>

            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="">Выберите город</option>
                {cities.map(city => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            <WebAppProvider>
              <MainButton onClick={webApp ? webApp.sendData({
                'city': selectedCity
              }) : console.log('web app is null')}/>
            </WebAppProvider>
        </div>
    );
};

export default CountryRegionCitySelect;

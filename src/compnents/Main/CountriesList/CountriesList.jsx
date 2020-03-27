import React from 'react';
import Country from "./Country/Country";
import styles from './CountriesList.module.css'

function CountriesList({selectedCountryId, getId, countries}) {

    const setCountryId = (id) => getId(id);

    return (
        <div className={styles.countriesBlock}>
            <h2>Countries</h2>
            {
                countries.map(country =>
                    <Country
                        setCountryId={setCountryId}
                        activeClass={selectedCountryId === country.id ? 'active' : ''}
                        id={country.id}
                        key={country.id}
                        title={country.title}
                        text={country.text}/>)
            }
        </div>
    )
}

export default CountriesList;

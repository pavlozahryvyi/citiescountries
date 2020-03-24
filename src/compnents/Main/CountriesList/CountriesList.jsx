import React from 'react';
import Country from "./Country/Country";
import styles from './CountriesList.module.css'

function CountriesList(props) {

    function setCountryId(id){
        props.getId(id);
    }

    let countriesArray = props.countries.map(country => <Country
        setCountryId = {setCountryId}
        activeClass={props.selectedCountryId === country.id ? 'active' : ''}
        id={country.id}
        key={country.id}
        title={country.title}
        text = {country.text}
    />);

    return (
        <div className={styles.countriesBlock}>
            <h2>Countries</h2>
            {countriesArray}
        </div>
    )
}

export default CountriesList;

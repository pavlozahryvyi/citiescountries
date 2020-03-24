import React from 'react';
import styles from "./Country.module.css"

function Country(props) {

    function setId() {
        props.setCountryId(props.id);
    }

    return (
        <div onClick={setId} className={styles.countryItem + ' ' + styles[props.activeClass]}>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
        </div>
    )
}

export default Country;

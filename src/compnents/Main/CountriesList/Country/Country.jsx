import React from 'react';
import styles from "./Country.module.css"

function Country({id, title, text, activeClass, setCountryId}) {

    function setId() {
        setCountryId(id);
    }

    return (
        <div onClick={setId} className={styles.countryItem + ' ' + styles[activeClass]}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}

export default Country;

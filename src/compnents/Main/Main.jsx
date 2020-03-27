import React, {Component} from 'react';
import CountriesList from "./CountriesList/CountriesList";
import CitiesList from "./CitiesList/CitiesList";
import styles from './Main.module.css'
import uuid from 'uuid';

class Main extends Component {

    state = {
        countries: [],
        cities: [],
        selectedCountryId: 1
    };


    componentDidMount() {
        this.setState({
            ...this.props.store
        })
    }

    addNewCity = (cityData) => {
        const { cities } = this.state;

        this.setState({
            cities: [ ...cities, {id: uuid.v4(), ...cityData}]
        })
    };

    editCity = (cityData) => {
        const { cities } = this.state;

        this.setState({
            cities: cities.map(city => city.id === cityData.id ? { ...city, title: cityData.title, desc: cityData.desc} : city)
        })
    };

    deleteCity = (cityId) => {
        const { cities } = this.state;

        this.setState({
            cities: cities.filter(city => city.id !== cityId)
        })
    };


    getCountryId = (id) => {
        this.setState({selectedCountryId: id});
    };

    render() {
        const { selectedCountryId, countries, cities } = this.state;

        return (
            <div className={styles.container}>
                <CountriesList selectedCountryId={selectedCountryId}
                               getId={this.getCountryId}
                               countries={countries}/>
                <CitiesList
                    addNewCity={this.addNewCity}
                    editCity={this.editCity}
                    deleteCity={this.deleteCity}
                    countryId={this.state.selectedCountryId}
                    cities={cities}/>
            </div>
        )
    }


}

export default Main;

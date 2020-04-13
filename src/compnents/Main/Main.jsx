import React, {Component} from 'react';
import CountriesList from "./CountriesList/CountriesList";
import CitiesList from "./CitiesList/CitiesList";
import styles from './Main.module.css'
// import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

class Main extends Component {

    state = {
        countries: [],
        cities: [],
        selectedCountryId: 1
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('props', this.props);
        // console.log('prevProps', prevProps);
        // console.log('state', this.state);
        // console.log('prevState', prevState);
    }

    componentDidMount() {
        console.log('countries', this.props.countries);
        this.getCities();
        this.setState({
            countries: [...this.props.countries],
        });
        console.log('didMount, axios requests');
        /*axios.get('http://localhost:4000/countries')
            .then(res => {
                // console.log(res);
                const countries = res.data;
                this.setState({countries})
            });*/

    }

    getCities = () => {
        axios.get('http://localhost:4000/cities')
            .then(res => {
                console.log('All cities', res);
                const cities = res.data;
                this.props.setCities(cities);
                this.setState({
                    cities: [...this.props.cities],
                });
                console.log(cities);
            });
    };

    addNewCity = (cityData) => {
        // const {cities} = this.state;
        const newCity = {/*id: uuidv4(),*/ ...cityData};

        /*axios.post('http://localhost:4000/cities', newCity)
            .then(res => {
                console.log('Posted: ', res);
                this.setState({
                    cities: [...cities, res.data]
                })
            });*/

        this.props.createNewCity(newCity);
    };

    editCity = (cityData) => {
        // const {cities} = this.state;

        console.log(cityData);
        axios.put(`http://localhost:4000/cities/${cityData.id}`, {
            //id:cityData.id,
            country_id: this.state.selectedCountryId,
            title: cityData.title,
            desc: cityData.desc
        })
            .then(res => {
            console.log('Putted: ', res);
            this.getCities()
        });


        /*this.setState({
            cities: cities.map(city => city.id === cityData.id ? { ...city, title: cityData.title, desc: cityData.desc} : city)
        })*/
    };

    deleteCity = (cityId) => {
        axios.delete(`http://localhost:4000/cities/${cityId}`)
            .then(res => {
                console.log('Deleted: ', res);
                //this.getCities();
            });
    };


    getCountryId = (id) => {
        this.setState({selectedCountryId: id});
    };


    render() {
        const {selectedCountryId, countries, cities} = this.state;
        //console.log(cities);

        return (
            <div className={styles.center}>
                <div className={styles.container}>
                    <CountriesList selectedCountryId={selectedCountryId}
                                   getId={this.getCountryId}
                                   countries={countries}/>
                    <CitiesList
                        addNewCity={this.addNewCity}
                        editCity={this.editCity}
                        deleteCity={this.deleteCity}
                        countryId={selectedCountryId}
                        cities={cities}/>

                </div>
            </div>
        )
    }


}

export default Main;

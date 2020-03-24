import React, {Component} from 'react';
import CountriesList from "./CountriesList/CountriesList";
import CitiesList from "./CitiesList/CitiesList";
import styles from './Main.module.css'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            cities: [],
            selectedCountryId: 1
        };
    }

    addNewCity = (cityData) => {
        console.log('add new city method');
        let citiesIdArray = this.props.store.cities.map(el => el['id']);
        let newCityId = Math.max(...citiesIdArray);
        let newCity = {
            "id": newCityId + 1,
            "country_id": cityData["country_id"],
            "title": cityData["title"],
            "desc": cityData["desc"]
        };

        this.state.cities.push(newCity);
        console.log(this.state);

    };

    editCity = (cityData) => {
        let citiesArray = this.state.cities.map((el) => {
            if (el['id'] === cityData.id) {
                el['title'] = cityData.title;
                el['desc'] = cityData.desc
            }
            return el;
        });
        this.setState({
            cities: citiesArray
        })
    };

    deleteCity = (cityId) => {
        let citiesArray = this.state.cities.filter((el) => {
            if(el.id !== cityId){
                return el;
            }
        });
        this.setState({
            cities: citiesArray
        })
    };

    componentDidMount() {
        this.setState({
            ...this.props.store
        })
    }

    getCountryId(id) {
        this.setState({selectedCountryId: id});
    }

    render() {
        return (
            <div className={styles.container}>
                <CountriesList selectedCountryId = {this.state.selectedCountryId} getId={this.getCountryId.bind(this)} countries={this.state.countries}/>
                <CitiesList
                    addNewCity={this.addNewCity}
                    editCity={this.editCity}
                    deleteCity={this.deleteCity}
                    countryId={this.state.selectedCountryId}
                    cities={this.state.cities}/>
            </div>
        )
    }


}

export default Main;

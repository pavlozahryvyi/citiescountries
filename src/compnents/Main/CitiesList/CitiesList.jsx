import React, {Component} from 'react';
import City from "./City/City";
import styles from './CitiesList.module.css'

class CitiesList extends Component {

    state = {
        isOpenFormAdd: false,
        isOpenBtnAdd: true,
        cityTitle: '',
        cityDesc: '',
        showWarning: false,
    };


    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({
            [name]: value
        })
    };

    validateFields = () => {
        if (this.state.cityTitle.trim() !== '' && this.state.cityDesc.trim() !== '')
            return true;

        if (this.state.cityTitle.trim() === '')
            this.setState({cityTitle: ''});

        if (this.state.cityDesc.trim() === '')
            this.setState({cityDesc: ''});

        this.setState({showWarning: true});
        return false;
    };

    addNewCity = () => {
        if (this.validateFields()) {
            this.props.addNewCity({
                country_id: this.props.countryId,
                title: this.state.cityTitle,
                desc: this.state.cityDesc
            });
            this.showAddButton();
        }
    };

    openAddCityForm = () => {
        this.setState({
            isOpenFormAdd: true,
            isOpenBtnAdd: false,
        });
    };

    showAddButton = () => {
        this.setState({
            isOpenFormAdd: false,
            isOpenBtnAdd: true,
            cityTitle: '',
            cityDesc: '',
            showWarning: false
        })
    };

    render() {
        const { countryId, deleteCity, editCity, cities } = this.props;


        let citiesArray = cities.filter((el) => el.country_id === countryId);

        let citiesArrayRender = citiesArray.map((el) =>
            <City
                editCity={editCity}
                deleteCity={deleteCity}
                key={el.id}
                cityId={el.id}
                title={el.title}
                desc={el.desc}
            />);


        const displayAddNewCityButton = countryId && this.state.isOpenBtnAdd &&
            <div className={styles.cityItem}>
                <button onClick={this.openAddCityForm} className={styles.addNewCityBtn}>+ Add city</button>
            </div>;

        const warning = this.state.showWarning && <p className={styles.warning}>All fields are required</p>;

        const addCityForm = this.state.isOpenFormAdd &&
            <div className={styles.addFormActive}>
                <p>Add city</p>
                <input
                    name={`cityTitle`}
                    type="text"
                    placeholder={`Country name...`}
                    value={this.state.cityTitle}
                    onChange={this.handleChange}
                    className={styles.inputField}/>
                <textarea
                    name={`cityDesc`}
                    placeholder={`Country description...`}
                    value={this.state.cityDesc}
                    onChange={this.handleChange}
                    className={styles.textareaField} />
                    <button onClick={this.addNewCity} className={styles.submitBtn}>Submit</button>
                <button onClick={this.showAddButton} className={styles.cancelBtn}>Cancel</button>
                {warning}
            </div>;


        return (
            <div className={styles.citiesBlock}>
                <h2>Cities</h2>
                <div className={styles.citiesWrap}>
                    {displayAddNewCityButton}
                    {addCityForm}
                    {citiesArrayRender}
                </div>
            </div>
        )
    }

}

export default CitiesList;

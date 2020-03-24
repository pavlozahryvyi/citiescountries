import React, {Component} from 'react';
import City from "./City/City";
import styles from './CitiesList.module.css'

class CitiesList extends Component{
    constructor(props){
        super(props);

        this.state = {
            isOpenFormAdd: false,
            isOpenBtnAdd: true,
            inputValue: '',
            textareaValue: '',
            showWarning: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.addNewCity = this.addNewCity.bind(this);
    }

    render() {
        let citiesArray = this.props.cities.filter((el)=> el.country_id === this.props.countryId);

        let citiesArrayRender = citiesArray.map((el) =>
            <City
                editCity = {this.props.editCity}
                deleteCity={this.props.deleteCity}
                key={el.id}
                cityId={el.id}
                title = {el.title}
                desc = {el.desc}
            />);


        const displayAddNewCityButton = this.props.countryId && this.state.isOpenBtnAdd &&
            <div className={styles.cityItem}>
            <button onClick={this.openAddCityForm} className={styles.addNewCityBtn}>+ Add city</button>
        </div>;

        const warning = this.state.showWarning && <p className={styles.warning}>All fields are required</p>;

        const addCityForm = this.state.isOpenFormAdd &&
            <div className={styles.addFormActive}>
                <p>Add city</p>
            <input
                type="text"
                placeholder={`Country name...`}
                value={this.state.inputValue}
                onChange={this.handleChange}
                className={styles.inputField}/>
            <textarea
                placeholder={`Country description...`}
                value={this.state.textareaValue}
                onChange={this.handleChange}
                className={styles.textareaField}></textarea>
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


    handleChange(event) {
        if(event.target.tagName === 'INPUT'){
            this.setState({
                inputValue: event.target.value,
            })
        }else if(event.target.tagName === 'TEXTAREA'){
            this.setState({
                textareaValue: event.target.value,
            })
        }
    }

    addNewCity(){
        if( this.state.inputValue !== '' && this.state.textareaValue !== ''){
            this.props.addNewCity({
                "country_id": this.props.countryId,
                "title": this.state.inputValue,
                "desc": this.state.textareaValue
            });

            this.setState({
                isOpenFormAdd: false,
                isOpenBtnAdd: true,
                inputValue: '',
                textareaValue: '',
                showWarning: false
            });
        }else{
            this.setState({
                showWarning: true
            })
        }
    }

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
            inputValue: '',
            textareaValue: '',
            showWarning: false
        })
    };

}

export default CitiesList;

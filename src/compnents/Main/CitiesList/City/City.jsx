import React, {Component} from 'react';
import styles from './City.module.css'

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class City extends Component{
    constructor(props){
        super(props);

        this.state = {
            inputValue: this.props.title,
            textareaValue: this.props.desc,

            isOpenFormAdd: false,
            isOpenCityInfo: true,

            showWarning: false,
        }

    }

    render(){
        const warning = this.state.showWarning && <p className={styles.warning}>All fields are required</p>;

        const editCityForm = this.state.isOpenFormAdd && <div className={styles.editBlock}>
            <p>Edit city {this.props.title}</p>
            <input type="text" value={this.state.inputValue} onChange={this.handleChange} className={styles.inputField}/>
            <textarea onChange={this.handleChange} value={this.state.textareaValue} className={styles.textareaField}/>
            <button className={styles.submitBtn} onClick={this.editCity}>Submit</button>
            <button onClick={this.closeEditForm} className={styles.cancelBtn}>Cancel</button>
            {warning}
        </div>;

        const cityInfo = this.state.isOpenCityInfo && <div className={styles.cityItem}>
            <div>
                <h4>{this.props.title}</h4>
                <p>{this.props.desc}</p>
            </div>
            <div className={styles.controlBtnBlock}>
                <button onClick={this.openEditCityForm} className={styles.controlBtn}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button onClick={this.deleteCity} className={styles.controlBtn}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </button>
            </div>
        </div>;

        return (
            <div>
                {cityInfo}
                {editCityForm}
            </div>
        )
    }

    editCity = () => {

        if(this.state.inputValue !== '' && this.state.textareaValue){
            this.props.editCity({
                id: this.props.cityId,
                title: this.state.inputValue,
                desc: this.state.textareaValue
            });
            this.closeEditForm();
        }else{
            this.setState({
                showWarning: true,
            });
        }
    };

    deleteCity = () => {
        this.props.deleteCity(this.props.cityId);
    };

    handleChange = (event) => {
        if(event.target.tagName === 'INPUT'){
            this.setState({
                inputValue: event.target.value,
            })
        }else if(event.target.tagName === 'TEXTAREA'){
            this.setState({
                textareaValue: event.target.value,
            })
        }
    };

    openEditCityForm = () =>{
        this.setState({
            isOpenFormAdd: true,
            isOpenCityInfo: false
        })
    };

    closeEditForm = () => {
        this.setState({

            isOpenFormAdd: false,
            isOpenCityInfo: true,
            showWarning: false
        })
    }
}

export default City;

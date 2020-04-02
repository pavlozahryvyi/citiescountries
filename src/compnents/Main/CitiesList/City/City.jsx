import React, {Component} from 'react';
import styles from './City.module.css'

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class City extends Component{
    
    state = {
        cityTitle: this.props.title,
        cityDesc: this.props.desc,
    
        isOpenFormAdd: false,
        isOpenCityInfo: true,
    
        showWarning: false,
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

    editCity = () => {
        if(this.validateFields()){
            this.props.editCity({
                id: this.props.cityId,
                title: this.state.cityTitle,
                desc: this.state.cityDesc
            });

            /*this.setState({
                isOpenFormAdd: false,
                isOpenCityInfo: true,
                showWarning: false,
            });*/
            this.closeEditForm();
        }
    };

    deleteCity = () => {
        this.props.deleteCity(this.props.cityId);
    };

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({
            [name]: value
        })
    };

    openEditCityForm = () =>{
        this.setState({
            isOpenFormAdd: true,
            isOpenCityInfo: false
        })
    };

    closeEditForm = () => {
        this.setState({
            // cityTitle: this.props.title,
            // cityDesc: this.props.desc,

            isOpenFormAdd: false,
            isOpenCityInfo: true,
            showWarning: false,
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        // console.log('--this.props', this.props);
        // console.log('--prevProps', prevProps);
        // console.log('--this.state', this.state);
        // console.log('--prevState', prevState);

        if (!this.state.isOpenFormAdd) {
            if ((this.props.title.trim() !== '' && this.state.cityTitle.trim() === '')
                || (this.props.title !== this.state.cityTitle)) {
                console.log('Yo!');
                this.setState({
                    cityTitle: this.props.title
                })
            }
            if ((this.props.desc.trim() !== '' && this.state.cityDesc.trim() === '')
                || (this.props.desc !== this.state.cityDesc)) {
                console.log('Yo!');
                this.setState({
                    cityDesc: this.props.desc
                })
            }
        }
    }



    render(){

        // console.log('---props', this.props);
        // console.log('---state', this.state);

        const warning = this.state.showWarning && <p className={styles.warning}>All fields are required</p>;

        const editCityForm = this.state.isOpenFormAdd && <div className={styles.editBlock}>
            <p>Edit city {this.props.title}</p>
            <input name={`cityTitle`} type="text" value={this.state.cityTitle} onChange={this.handleChange} className={styles.inputField}/>
            <textarea name={`cityDesc`} onChange={this.handleChange} value={this.state.cityDesc} className={styles.textareaField}/>
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
}

export default City;

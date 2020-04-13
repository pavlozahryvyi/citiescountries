import React from 'react';
import styles from './App.module.css';
import Main from "./compnents/Main/Main";
import MainContainer from "./compnents/Main/MainContainer";;

function App(props) {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.center}>
                    <p>Countries of the world</p>
                </div>
            </header>
            <div className={styles.main}>
                {/*<div className={styles.center}>
                    <Main store = {props.store}/> store={props.store}*/}
                {/*</div>*/}

                <MainContainer/>
            </div>
            <footer className={styles.footer}>
                <div className={styles.center}>
                    <p>Test task</p>
                </div>
            </footer>
        </div>
    );
}

export default App;

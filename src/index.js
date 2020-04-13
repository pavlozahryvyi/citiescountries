import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import store from './store';
import reduxStore from "./state/reduxStore";
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={reduxStore}>
        <App/>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();

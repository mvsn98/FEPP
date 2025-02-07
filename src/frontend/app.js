import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css'
import './styles/ReactStyles.css'

import { login } from './actions/auth';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

const store = configureStore();

const strAuth = localStorage.getItem('auth');
if(strAuth) {
    const auth = JSON.parse(strAuth);
    store.dispatch(login({name: auth.name, jwt: auth.token}));
}

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

ReactDOM.render(jsx,document.getElementById("app"));



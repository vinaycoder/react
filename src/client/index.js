import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { initOnClient } from '../shared/lib/settings';
import clientSettings from './settings';
import reducers from '../shared/reducers';
import * as analytics from '../shared/analytics';
import App from '../shared/app';
import api from './api';

const initialState = window.__APP_STATE__;
const themeText = window.__APP_TEXT__;
console.log('initial state in client index');
console.log(initialState);
initOnClient({
	themeSettings: initialState.app.themeSettings,
	text: themeText,
	language: clientSettings.language,
	api: api,
	customerDetails: initialState.app.customerDetails,
	isLoggedIn: initialState.app.isLoggedIn,
	statsCookieId: initialState.app.statsCookieId
});

const store = createStore(
	reducers,
	initialState,
	applyMiddleware(thunkMiddleware)
);

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('app')
);

analytics.onPageLoad({ state: initialState });
/*
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/sw.js')
			.then(registration => {
				console.log('SW registered.');
			})
			.catch(registrationError => {
				console.log('SW registration failed: ', registrationError);
			});
	});
}
*/

import React from 'react';
import UrlShortener from './UrlShortener';
import { Provider } from 'react-redux';

const Root = ({ store }) =>
    <Provider store={store}>
        <UrlShortener />
    </Provider>

export default Root;
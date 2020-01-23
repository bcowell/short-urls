import React from 'react';
import { render } from 'react-dom';
import Root from 'components';
import store from 'store';
import './index.scss';

render(<Root store={store} />, document.getElementById('root'));
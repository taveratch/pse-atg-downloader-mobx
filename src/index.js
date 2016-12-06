import React from 'react';
global.React = React;
import _ from 'lodash';
global._ = _;
import { render } from 'react-dom';
import App from './components/app';
import './styles/app.scss';

render(<App/>, document.getElementById('main'));

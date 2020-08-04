import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';

import Uploader from './'

it('render Uploader without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Uploader />, div);
  });
import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';

import Upload from '.'

it('render Upload without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Upload />, div);
  });
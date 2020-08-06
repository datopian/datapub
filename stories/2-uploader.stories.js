
import React from "react";
import { action } from '@storybook/addon-actions';

import Upload from '../src/components/Upload'
import '../src/App.css';

export default {
  title: 'Components /Upload',
  component: Upload,
};


export const Idle = () => <Upload/>;

export const Loading = () => <Upload/>;

export const Success = () => <Upload/>;

export const Failed = () => <Upload/>;

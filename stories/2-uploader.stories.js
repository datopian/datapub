
import React from "react";
import { action } from '@storybook/addon-actions';

import Uploader from '../src/components/Uploader'
import '../src/App.css';

export default {
  title: 'Components /Uploader',
  component: Uploader,
};


export const Idle = () => <Uploader/>;

export const Loading = () => <Uploader/>;

export const Success = () => <Uploader/>;

export const Failed = () => <Uploader/>;


import React from "react";
import { action } from '@storybook/addon-actions';

import Metadata from '../src/components/Metadata'

export default {
  title: 'Components /Metadata',
  component: Metadata,
  argTypes: {
    loading: { control: 'boolean' }
  }
}

const Template = (args) => (<Metadata {...args} />);

export const Idle = Template.bind({});

Idle.args = {
    metadata: {
        title: "",
        description: "",
        encoding: "",
        path: "",
        format: "",
        license: ""
    },
    handleChange: action('change value'),
    handleSubmit: action('submit form'),
    loading: false,
    selectedFile: false
};


export const Loading = Template.bind({});

Loading.args = {
    ...Idle.args,
    loading: true,
    selectedFile: true
};

export const Success = Template.bind({});

Success.args = {
    ...Idle.args,
    loading: false,
    selectedFile: true
};


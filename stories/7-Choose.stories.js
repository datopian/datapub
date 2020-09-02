
import React from "react";
import { action } from '@storybook/addon-actions';

import Choose from '../src/components/Choose'

export default {
  title: 'Components /Choose    ',
  component: Choose,
}

const Template = (args) => (
    <div style={{ textAlign: "center", width: "340px" }}>
        <Choose {...args} />
    </div>
);

export const Default = Template.bind({});

Default.args = {
    onChangeUrl: action('change url'),
    onChangeHandler: action('change file'),
};

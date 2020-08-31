
import React from "react";
import { action } from '@storybook/addon-actions';

import InputUrl from '../src/components/InputUrl'

export default {
  title: 'Components /Input/Url',
  component: InputUrl,
}

const Template = (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "380px 240px" }}>
        <InputUrl {...args} />
    </div>
);

export const Default = Template.bind({});

Default.args = {
    onChangeUrl: action('change value'),
};

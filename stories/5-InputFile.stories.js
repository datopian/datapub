
import React from "react";
import { action } from '@storybook/addon-actions';

import InputFile from '../src/components/InputFile'

export default {
  title: 'Components /Input/File',
  component: InputFile,
}

const Template = (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "380px 240px" }}>
        <InputFile {...args} />
    </div>
);

export const DragAndDrop = Template.bind({});

DragAndDrop.args = {
    onChangeHandler: action('change value'),
};

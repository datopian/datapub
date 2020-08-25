
import React from "react";
import { action } from '@storybook/addon-actions';

import TableSchema from '../src/components/TableSchema'

export default {
  title: 'Components /TableSchema',
  component: TableSchema,
}

const Template = (args) => (<TableSchema {...args} />);

export const Default = Template.bind({});

Default.args = {
    schema: {
        fields: [
            {
              title: '',
              name: 'a',
              type: 'string',
              description: 'column a is about X',
              format: '...'
            },
            {
              title: '',
              name: 'b',
              type: 'integer',
              description: 'column b is about X',
              format: '...'
            }
          ]
    },
    data:[{ a: 1, b: 2}, {a: 5, b: 10}]
};


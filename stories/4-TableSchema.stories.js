import React from "react";
import { action } from "@storybook/addon-actions";

import TableSchema from "../src/components/TableSchema";

export default {
  title: "Components /TableSchema",
  component: TableSchema,
};

const Template = (args) => <TableSchema {...args} />;

export const Idle = Template.bind({});

Idle.args = {
  schema: {
    fields: [
      {
        title: "",
        name: "name",
        type: "string",
        description: "",
        format: "",
      },
      {
        title: "",
        name: "age",
        type: "integer",
        description: "",
        format: "",
      },
      {
        title: "",
        name: "address",
        type: "string",
        description: "",
        format: "",
      },
    ],
  },
  data: [
    { name: "Eathan Pritchard", age: 25, address: "1201 Tompkins Dr Madison" },
    { name: "Zidan Berg", age: 22, address: "1309 Tompkins Dr Madison" },
    { name: "Raisa Kinney", age: 32, address: "1497 Tompkins Dr Madison" },
    { name: "Cara Woodley", age: 30, address: "1197  Buckeye Rd  Madison" },
    { name: "Komal Robbins", age: 42, address: "1192  Buckeye Rd  Madison" },
    { name: "Deacon Childs", age: 28, address: "1027 Tompkins Dr Madison" },
    { name: "Ayse Shaw", age: 21, address: "1233 Buckeye Rd Madison" },
  ],
};


export const Loading = Template.bind({});

Loading.args = {
    ...Idle.args,
};

export const Success = Template.bind({});

Success.args = {
    ...Idle.args,
    uploadSuccess: true
};

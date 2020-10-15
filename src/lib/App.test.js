import React from "react";
import { shallow } from "enzyme";

import App from "./App";

describe("<App />", () => {

    it("should render in add a resource", () => {
        const wrapper = shallow(<App/>);

        expect(wrapper.find(".btn")).toHaveLength(1)
        expect(wrapper.find(".btn-delete")).toHaveLength(0)
    });
})
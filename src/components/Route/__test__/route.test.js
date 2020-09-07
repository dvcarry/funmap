import React from 'react';
import { Route } from "../Route"
import renderer from "react-test-renderer"

it("render correctly route component", () => {
    const routeComponent = renderer.create(<Route center={[55.75, 37.57]}/>).toJSON()
    expect(routeComponent).toMatchSnapshot();
});
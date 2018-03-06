import { Route } from 'react-router-dom';
import React from 'react';
import AboutComp from '../../components/About';

export const ABOUT_ROUTE_PATH = '/about';

export const About = props => (
  <Route exact path={ABOUT_ROUTE_PATH} component={AboutComp} {...props} />
);

export default [About];

import { Route } from 'react-router-dom';
import React from 'react';
import Homepage from '../../containers/Homepage';

export const HOMEPAGE_ROUTE_PATH = '/';

export const HomepageRoute = props => (
  <Route exact path={HOMEPAGE_ROUTE_PATH} component={Homepage} {...props} />
);

export default [HomepageRoute];

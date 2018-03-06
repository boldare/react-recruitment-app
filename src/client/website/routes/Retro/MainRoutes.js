import { Route } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import Retro from '../../containers/Retro';

export const RETRO_ROUTE_PATH = '/retro/:retroShareId';

export const retroRoutePath = retroShareId => RETRO_ROUTE_PATH.replace(':retroShareId', retroShareId);

export const RetroRoute = props => (
  <Route
    exact
    path={RETRO_ROUTE_PATH}
    component={Retro}
    {...props}
  />
);

RetroRoute.propTypes = {
  location: PropTypes.object.isRequired
};

export default [RetroRoute];

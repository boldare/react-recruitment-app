import { Route } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import NameStep from '../../containers/NewRetro/NameStep';
import ColumnsStep from '../../containers/NewRetro/ColumnsStep';
import ShareStep from '../../containers/NewRetro/ShareStep';

export const NEW_RETRO_ROUTE_PATH = '/new';
export const NEW_RETRO_COLUMNS_ROUTE_PATH = '/new/:retroShareId/columns';
export const NEW_RETRO_SHARE_ROUTE_PATH = '/new/:retroShareId/share';

export const newRetroColumnsRoutePath = retroShareId =>
  NEW_RETRO_COLUMNS_ROUTE_PATH.replace(':retroShareId', retroShareId);
export const newRetroShareRoutePath = retroShareId =>
  NEW_RETRO_SHARE_ROUTE_PATH.replace(':retroShareId', retroShareId);

export const NewRetroRoute = props => (
  <Route
    exact
    path={NEW_RETRO_ROUTE_PATH}
    component={NameStep}
    {...props}
  />
);
export const NewRetroColumnsRoute = props => (
  <Route
    exact
    path={NEW_RETRO_COLUMNS_ROUTE_PATH}
    component={ColumnsStep}
    {...props}
  />
);
export const NewRetroShareRoute = props => (
  <Route
    exact
    path={NEW_RETRO_SHARE_ROUTE_PATH}
    component={ShareStep}
    {...props}
  />
);

NewRetroRoute.propTypes = {
  location: PropTypes.object.isRequired
};

export default [NewRetroRoute, NewRetroColumnsRoute, NewRetroShareRoute];

import { Route } from 'react-router-dom';
import React from 'react';
import JoinRetro from '../../containers/JoinRetro';

export const JOIN_RETRO_ROUTE_PATH = '/join';

export const JoinRetroRoute = props => (
  <Route exact path={JOIN_RETRO_ROUTE_PATH} component={JoinRetro} {...props} />
);

export default [JoinRetroRoute];

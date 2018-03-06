import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { mainRoutes } from '../../routes';
import NotFound from '../../components/NotFound';

const MainContent = props => (
  <Switch>
    {mainRoutes.map(
      // Key index is okay here
      // eslint-disable-next-line react/no-array-index-key
      (route, idx) => route({ ...props, key: idx }),
    )}
    <Route component={() => <NotFound />} />
  </Switch>
);

export default MainContent;

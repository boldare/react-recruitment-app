import React from 'react';
import { Switch } from 'react-router-dom';
import { headerRoutes } from '../../routes';

const HeaderContent = props => (
  <Switch>
    {headerRoutes.map(
      // Key index is okay here
      // eslint-disable-next-line react/no-array-index-key
      (route, idx) => route({ ...props, key: idx }),
    )}
  </Switch>
);

export default HeaderContent;

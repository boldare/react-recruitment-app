import Homepage from './Homepage';
import JoinRetro from './JoinRetro';
import NewRetro from './NewRetro';
import Retro from './Retro';
import About from './About';
import {
  MAIN_ROUTES_KEY, HEADER_ROUTES_KEY
} from './routesKeys';

export const allRoutes = [
  Homepage,
  JoinRetro,
  NewRetro,
  Retro,
  About
];

export const genericRoutesReducer = routesKey => (acc, pageRoutes) => (
  pageRoutes[routesKey]
    ? [...acc, ...pageRoutes[routesKey]]
    : acc
);

export const genericRouteReduce = routesKey => allRoutes.reduce(
  genericRoutesReducer(routesKey),
  []
);

export const mainRoutes = genericRouteReduce(MAIN_ROUTES_KEY);
export const headerRoutes = genericRouteReduce(HEADER_ROUTES_KEY);

export default allRoutes;

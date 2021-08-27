/* eslint-disable react/prop-types */
import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
const barbers = [
  'amanda.vieira@poli.ufrj.br',
  'luanfreitas12@poli.ufrj.br',
  'luanfreitas12@hotmail.com',
  'antonio.vieira@poli.ufrj.br',
];

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  const barberVerify = barbers.includes(user?.email);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              // eslint-disable-next-line no-nested-ternary
              pathname: isPrivate
                ? '/signin'
                : barberVerify
                ? '/dashboard'
                : '/dashboardUser',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;

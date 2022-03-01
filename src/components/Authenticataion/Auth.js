import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { SIGNIN_ROUTE, REGISTER_ROUTE, ACCOUNT_PAGE } from '../../constants/routes';
import Account from './Account';

function Auth() {
 
  return (
    <Switch>
      <Route path={SIGNIN_ROUTE}>
        <Login />
      </Route>
      <Route path={REGISTER_ROUTE}>
        <Register />
      </Route>
      <Route path={ACCOUNT_PAGE}>
        <Account />
      </Route>
    </Switch>
  );
}

export default Auth;

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
      <Redirect to={SIGNIN_ROUTE} />
    </Switch>
  );
}

export default Auth;

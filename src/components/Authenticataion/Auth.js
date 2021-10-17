import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { SIGNIN_ROUTE, REGISTER_ROUTE } from '../../constants/routes';

function Auth() {
 
  return (
    <Switch>
      <Route path={SIGNIN_ROUTE}>
        <Login />
      </Route>
      <Route path={REGISTER_ROUTE}>
        <Register />
      </Route>
      <Redirect to={SIGNIN_ROUTE} />
    </Switch>
  );
}

export default Auth;

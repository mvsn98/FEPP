import React from 'react';
import { Router, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import CreateAccount from '../components//CreateAccount'
import EditProfile from '../components/EditProfile'
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';

import PrivateRoute from '../routers/PrivateRoute'
import PublicRoute from '../routers/PublicRoute'

export const history = createHistory();

const AppRouter = () => {

  return (
      <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/console" component={LoginPage} exact={true}/>
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/edit" component={EditProfile} />
          <PrivateRoute path="/create" component={CreateAccount} />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter;

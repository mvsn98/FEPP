import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  path,
  exact
}) => (
    <Route path={path} component={(props) => (
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} exact={exact} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(PrivateRoute);
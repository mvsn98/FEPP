import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  path,
  exact
}) => (
    <Route path={path} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/home" />
      ) : (
          <Component {...props} />
        )
    )} exact={exact} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(PublicRoute);

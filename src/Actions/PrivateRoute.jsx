import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => localStorage.getItem("user")  !== null && localStorage.getItem("type") === 'employee'
          ? <Component {...props} />
          : <Redirect to={{pathname: '/employee/login', state: {from: props.location}}} />}
      />
    )
  }


  export default PrivateRoute;
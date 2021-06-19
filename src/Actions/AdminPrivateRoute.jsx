import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

function AdminPrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => localStorage.getItem("user")  !== null && localStorage.getItem("type") === 'admin'
          ? <Component {...props} />
          : <Redirect to={{pathname: '/admin/login', state: {from: props.location}}} />}
      />
    )
  }


  export default AdminPrivateRoute;
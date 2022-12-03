import React, { Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import routes from 'routes';

import 'antd/dist/antd.css';

const MainLayout = () => {
  return (
    <Fragment>
      <Switch>
        {routes.map((route) => {
          return route.Component ? (
            <Route
              key={route.Component}
              path={route.path}
              exact={route.exact}
              render={props => <route.Component {...props} />}
            />
          ) : null;
        })}
      </Switch>
    </Fragment>
  )
};

export default MainLayout;

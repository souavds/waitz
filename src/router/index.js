import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Place from '../pages/Place';

const Routes = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/place" component={Place} />
  </Switch>
);

export default Routes;

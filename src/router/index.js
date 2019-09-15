import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

const Routes = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/signin" component={Signin} />
    <Route path="/signup" component={Signup} />
  </Switch>
);

export default Routes;

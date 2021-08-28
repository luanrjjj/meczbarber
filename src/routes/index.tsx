import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/profile';
import Dashboard from '../pages/Dashboard';
import Barbers from '../pages/Barbers';
import Appointment from '../pages/Appointment';
import DashboardUser from '../pages/DashboardUser';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset_password" component={ResetPassword} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/barbers" component={Barbers} isPrivate />
      <Route path="/appointment" component={Appointment} isPrivate />
      <Route path="/dashboardUser" component={DashboardUser} isPrivate />
    </Switch>
  );
};

export default Routes;

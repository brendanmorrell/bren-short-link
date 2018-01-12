import React from 'react';
import { Router, Route, Switch, } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Tracker, } from 'meteor/tracker';

import LoginPage from '../ui/LoginPage';
import SignupPage from '../ui/SignupPage';
import Link from '../ui/Link';
import NotFoundPage from '../ui/NotFoundPage';


const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup', ];
const authenticatedPages = ['/links', ];


export const routes =
  <Router history={browserHistory}>
    <Switch>
      <Route path="/" component={LoginPage} exact={true} />
      <Route path="/signup" component={SignupPage} exact={true} />
      <Route path="/links" component={Link} exact={true} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </Router>;


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathName = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);


  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/links');
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace('/');
  }
});

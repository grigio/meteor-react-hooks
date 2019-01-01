import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import NavBar from '../imports/ui/NavBar';
import HomePage from '../imports/ui/HomePage';
import TasksPage from '../imports/ui/TasksPage';

import LoginPage from '../imports/ui/LoginPage';
import { AppContext } from './AppContext';
import { useUser } from './utils/useUser';
// import NotFound from './../ui/components/NotFound';
// import Signup from './../ui/components/Signup';

const history = createBrowserHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/link'];

const publicPage = function () {
  if (Meteor.userId()) {
    history.replace('/link');
  }
};

const privatePage = function () {
  if (!Meteor.userId()) {
    history.replace('/');
  }
};

function Layout({ children }) {
  // const [currentUser, loginWithPawword] = useUser()
  const [currentUser, setCurrentUser] = useState()
  return (
    // <AppContext.provider value={{currentUser}}>
    <div>

      <NavBar />

      <div>
        {children}

      </div>
    </div>
    // </AppContext.provider>
  )
}

export const routes = (
  <Router history={history}>
    <Switch>
      {/* <Route exact path='/:id' component= {Login} onEnter={publicPage}/>
          <Route exact path='/signup' component={Signup} onEnter={publicPage}/> */}
      <Route exact path='/tasks' render={() => <Layout><TasksPage greet='User' /></Layout>} onEnter={privatePage} />
      <Route exact path='/home' render={() => <Layout><HomePage /></Layout>} />
      <Route exact path='/login' render={() => <Layout><LoginPage /></Layout>} />

      <Route exact path="/" render={() => (
          <Redirect to="/home" />
      )} />

      {/* <Route component={NotFound}/> */}
    </Switch>
  </Router>
);

export const onAuthChange = function (authenticated) {
  console.log("isAuthenticated: ", authenticated);
  const path = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(path);
  const isAuthenticatedPage = authenticatedPages.includes(path);
  if (authenticated && isUnauthenticatedPage) {   // pages: /signup and /
    console.log(`Authenticated user routed to the path /link`);
    history.replace('/link');
  } else if (!authenticated && isAuthenticatedPage) {
    console.log(`Unauthenticated user routed to the path /`);
    history.replace('/');
  }
};
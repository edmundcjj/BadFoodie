import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import ReviewView from './components/Reviews';
import Login from './containers/Admin/login';
import User from './components/Admin';
import AddReview from './containers/Admin/add';
import UserPosts from './components/Admin/userPosts';
import EditReview from './containers/Admin/edit';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        {/* Homepage to display all the restaurant reviews */}
        <Route path="/" exact component={Auth(Home, null)}/>

        {/* Login Page */}
        <Route path="/login" exact component={Auth(Login, false)}/>

        {/* User Page */}
        <Route path="/user" exact component={Auth(User, true)}/>

        {/* Add review Page */}
        <Route path="/user/add" exact component={Auth(AddReview, true)}/>

        {/* Edit review Page */}
        <Route path="/user/edit-post/:id" exact component={Auth(EditReview, true)}/>

        {/* Display details of an individual review */}
        <Route path="/reviews/:id" exact component={Auth(ReviewView, null)}/>

        {/* User Reviews Page */}
        <Route path="/user/user-reviews" exact component={Auth(UserPosts, true)}/>
      </Switch>
    </Layout>
  );
};

export default Routes;

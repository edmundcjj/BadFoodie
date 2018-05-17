import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/home';
import ReviewView from './components/Reviews';
import Layout from './hoc/layout';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        {/* Homepage to display all the restaurant reviews */}
        <Route path="/" exact component={Home}/>

        {/* Display details of an individual review */}
        <Route path="/reviews/:id" exact component={ReviewView}/>
      </Switch>
    </Layout>
  );
};

export default Routes;

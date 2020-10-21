import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Forms from './components/Pages/Forms/Forms';
import Home from './components/Pages/Home/Home';
import Records from './components/Pages/Records/Records';

const Router = (props) => (

    <BrowserRouter>
        <Switch>
            <RouteWrapper exact path="/" component={Home} layout={Layout} />
            <RouteWrapper exact path="/forms" component={Forms} layout={Layout} />
            <RouteWrapper exact path="/records" component={Records} layout={Layout} />
        </Switch>
    </BrowserRouter>


);

function RouteWrapper({
    component: Component,
    layout: Layout,
    ...rest
}) {
    return (
        <Route {...rest} render={(props) =>
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        } />
    );
}

export default Router;
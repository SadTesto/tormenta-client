import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SiteWrapper from '../Admin/SiteWrapper';
import './index.css';

import NavItems from './NavItems';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';

const getTitle = pathname => {
    let spt = pathname.split('/');
    let str = spt[spt.length - 1];
    if (str === '') {
        str = 'dashboard';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const App = () => (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Route path="/login" component={Login} exact />
                <Route path="*" render={({ location, ...rest }) => (
                    <SiteWrapper 
                        navItemSelected={NavItems.find(({ text }) => text === getTitle(location.pathname)).id}
                        navItems={NavItems}
                        title={getTitle(location.pathname)}
                    >
                        <Switch location={location}>
                            <Route path="/" component={Dashboard} exact />
                            <Route path="/impostazioni" component={Settings} exact />
                            <Route path="*" component={Dashboard} />
                        </Switch>
                    </SiteWrapper>
                )} />
            </Switch>
        </Fragment>
    </BrowserRouter>
);

export default App;

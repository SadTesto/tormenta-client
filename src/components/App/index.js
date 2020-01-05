import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import SiteWrapper from '../Admin/SiteWrapper';
import './index.css';

import store from '../../store';

import AuthRoute from '../Admin/AuthRoute';
import AdminAlert from '../Admin/AdminAlert';
import NavItems from './NavItems';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';
import NewTournament from '../pages/NewTournament';
import Teams from '../pages/Teams';
import Matches from '../pages/Matches';
import NotFound from '../pages/NotFound';

const getTitle = pathname => {
	let spt = pathname.split('/');
	let str = spt[spt.length - 1];
	if (str === '') {
		str = 'dashboard';
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const getId = pathname => {
    let item = NavItems.find(({ text }) => text === getTitle(pathname));
	if (!item) {
		item = { id: -1 };
    }
	return item.id;
};

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route
                        path="/login"
                        component={Login}
                        exact
                    />
                    <AuthRoute
                        path="*"
                        component={({ location, fetchError, setFetchError }) => (
                            <SiteWrapper
                                navItemSelected={getId(location.pathname)}
                                navItems={NavItems}
                                title={getTitle(location.pathname)}
                            >
                                <AdminAlert
                                    display={fetchError !== null}
                                    title="Errore"
                                    message={fetchError}
                                    type="error"
                                />
                                <Switch location={location}>
                                    <Route
                                        path="/"
                                        component={Dashboard}
                                        exact
                                    />
                                    <Route
                                        path="/squadre"
                                        component={Teams}
                                        exact
                                    />
                                    <Route
                                        path="/partite"
                                        component={Matches}
                                        exact
                                    />
                                    <Route
                                        path="/impostazioni"
                                        component={Settings}
                                        exact
                                    />
                                    <Route
                                        path="/nuovo"
                                        render={() => {
                                            setFetchError(null);
                                            return <NewTournament />
                                        }}
                                        exact
                                    />
                                    <Route component={NotFound}/>
                                </Switch>
                            </SiteWrapper>
                        )}
                    />
                </Switch>
            </Fragment>
        </BrowserRouter>
    </Provider>
);

export default App;

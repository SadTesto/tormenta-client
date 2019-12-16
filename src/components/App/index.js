import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SiteWrapper from '../Admin/SiteWrapper';
import './index.css';

import AuthRoute from '../Admin/AuthRoute';
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
};

const getId = pathname => {
    let item = NavItems.find(
        ({ text }) => text === getTitle(pathname)
    );
    if (!item) {
        item = { id: 0 };
    }
    return item.id;
};

const App = () => (
	<BrowserRouter>
		<Fragment>
			<Switch>
				<Route path="/login" component={Login} exact />
				<AuthRoute
                    user={{}}
					path="*"
					component={({ location, ...rest }) => (
						<SiteWrapper
							navItemSelected={getId(location.pathname)}
							navItems={NavItems}
							title={getTitle(location.pathname)}
						>
							<Switch location={location}>
								<Route path="/" component={Dashboard} exact />
								<Route
									path="/impostazioni"
									component={Settings}
									exact
								/>
								<Route
									render={props => (
										<h1>Pagina non trovata...</h1>
									)}
								/>
							</Switch>
						</SiteWrapper>
					)}
				/>
			</Switch>
		</Fragment>
	</BrowserRouter>
);

export default App;

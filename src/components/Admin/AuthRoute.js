import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ user, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			user.authed === true ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: {
							from: props.location,
							message: 'Autenticazione richiesta'
						}
					}}
				/>
			)
		}
	/>
);

AuthRoute.propTypes = {
    user: PropTypes.object,
};

export default AuthRoute;

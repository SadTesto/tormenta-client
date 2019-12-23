import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, admin, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            admin.authed === true ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            from: props.location,
                            message: "Autenticazione richiesta"
                        }
                    }}
                />
            )
        }
    />
);

AuthRoute.propTypes = {
    admin: PropTypes.object.isRequired,
    component: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin
});

export default connect(mapStateToProps)(AuthRoute);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchInfo } from '../../actions/tournamentActions';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ 
    component: Component, 
    fetchInfo,
    admin, 
    tournament, 
    ...rest 
}) => {
    if (admin.authed === true && tournament.pendings.info === undefined) {
        fetchInfo().catch(err => setError(err.message));
    }
    const [error, setError] = useState(null);
    return (
        <Route
            {...rest}
            render={props =>
                admin.authed === true ? (
                    <Component fetchError={error} setFetchError={setError} {...props} />
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
};

AuthRoute.propTypes = {
    fetchInfo: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
    tournament: PropTypes.object.isRequired,
    component: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
    tournament: state.tournament,
    admin: state.admin
});

export default connect(mapStateToProps, { fetchInfo })(AuthRoute);

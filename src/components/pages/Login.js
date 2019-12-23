import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authAdmin } from '../../actions/adminActions';
import { Layout, Card } from 'antd';
import { Redirect } from 'react-router-dom';
import LoginCard from '../Admin/LoginCard';

const { Content, Footer } = Layout;

const Login = ({ admin, authAdmin }) => 
    admin.authed !== true ? (
        <Layout style={{ height: '100%', display: 'flex' }}>
            <Content>
                <div
                    style={{
                        position: 'absolute',
                        top: window.innerWidth < 999 ? '10%' : '50%',
                        left: '50%',
                        transform:
                            'translate(-50%, ' +
                            (window.innerWidth < 999 ? '0)' : '-50%)'),
                        width: '100%',
                        maxWidth: 350,
                        padding: 10
                    }}
                >
                    <Card
                        title="Login"
                        className="login-card"
                        headStyle={{ textAlign: 'center' }}
                        bordered={true}
                    >
                        <LoginCard authAdmin={authAdmin}/>
                    </Card>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Tormenta ©{new Date().getFullYear()} | By <a href="https://www.tronweb.it">TronWeb</a>
            </Footer>
        </Layout>
    ) : (
        <Redirect to={{ pathname: '/' }}/>
    );

Login.propTypes = {
    admin: PropTypes.object.isRequired,
    authAdmin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin
});

export default connect(mapStateToProps, { authAdmin })(Login);

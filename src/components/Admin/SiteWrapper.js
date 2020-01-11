import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, PageHeader, Avatar } from 'antd';

const { Content, Footer, Sider } = Layout;

const SiteWrapper = ({ 
    navItemSelected,
    navItems, 
    title,
    subtitle,
    logout,
    admin,
    tournament,
    children 
}) => (
	<Layout style={{ height: '100%' }}>
        <Sider 
            breakpoint='md' 
            collapsedWidth='0' 
            style={{
                backgroundColor: '#222222'
            }}
        >
            <div style={{ textAlign: 'center', padding: '.8rem 0' }}>
                <Avatar shape="square" size={64} icon="user" />
                <h4 
                    style={{ 
                        color: '#ffffff', 
                        marginTop: 10, 
                        marginBottom: 0 
                    }}
                >{admin.username}</h4>
            </div>
			<div className='logo' />
            <Menu 
                theme='dark' 
                mode='inline' 
                selectedKeys={[String(navItemSelected)]}
                style={{
                    backgroundColor: '#222222'
                }}
            >
				{navItems.map(({ id, icon, text, location }) => (
                    <Menu.Item key={id} disabled={id !== 1 && tournament.id === null}>
                        <Link to={{ pathname: location }} key={id}>
                            <Icon type={icon} />
                            <span className='nav-text'>
                                {text}
                            </span>
                        </Link>
                    </Menu.Item>
				))}

                <Menu.Item onClick={logout}>
                    <Icon type="logout" />
                    <span className="nav-text">
                        Logout
                    </span>
                </Menu.Item>
			</Menu>
		</Sider>
		<Layout>
			<Content>
				<PageHeader
					style={{
                        paddingBottom: 10
					}}
					onBack={() => null}
					title={title}
                    subTitle={subtitle}
                    backIcon={<React.Fragment></React.Fragment>}
				/>
                <div 
                    className="content-wrapper"
                    style={{ padding: '0 10px 10px 10px' }}
                >
                    {children}
                </div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
                Tormenta © {new Date().getFullYear()} | By <a href="https://www.tronweb.it">TronWeb</a>
			</Footer>
		</Layout>
	</Layout>
);

SiteWrapper.propTypes = {
    navItemSelected: PropTypes.number.isRequired,
    navItems: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    admin: PropTypes.object,
    logout: PropTypes.func.isRequired,
	children: PropTypes.any
};

const mapStateToProps = state => ({
    tournament: state.tournament,
    admin: state.admin
});

export default connect(mapStateToProps, { logout })(SiteWrapper);

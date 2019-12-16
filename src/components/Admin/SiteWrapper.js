import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, PageHeader } from 'antd';

const { Content, Footer, Sider } = Layout;

const SiteWrapper = ({ 
    navItemSelected,
    navItems, 
    title,
    subtitle,
    children 
}) => (
	<Layout style={{ height: '100%' }}>
		<Sider breakpoint='md' collapsedWidth='0'>
			<div className='logo' />
			<Menu theme='dark' mode='inline' defaultSelectedKeys={[String(navItemSelected)]}>
				{navItems.map(({ id, icon, text, location }) => (
                    <Menu.Item key={id}>
                        <Link to={{ pathname: location }} key={id}>
                            <Icon type={icon} />
                            <span className='nav-text'>
                                {text}
                            </span>
                        </Link>
                    </Menu.Item>
				))}
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
                Tormenta ©{new Date().getFullYear()} | By <a href="https://www.tronweb.it">TronWeb</a>
			</Footer>
		</Layout>
	</Layout>
);

SiteWrapper.propTypes = {
    navItemSelected: PropTypes.number.isRequired,
    navItems: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
	children: PropTypes.any
};

export default SiteWrapper;

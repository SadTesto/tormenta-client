import React from 'react';
import { Layout, Card } from 'antd';
import LoginCard from '../Admin/LoginCard';

const { Content, Footer } = Layout;

const Login = () => (
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
                    <LoginCard />
                </Card>
			</div>
		</Content>
		<Footer style={{ textAlign: 'center' }}>
			Tormenta ©{new Date().getFullYear()} | By <a href="https://www.tronweb.it">TronWeb</a>
		</Footer>
	</Layout>
);

export default Login;

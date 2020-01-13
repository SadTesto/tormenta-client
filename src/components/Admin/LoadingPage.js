import React from 'react';
import { Spin, Icon } from 'antd';

const LoadingPage = () => (
	<div style={{ marginTop: 60, textAlign: 'center' }}>
		<Spin
			indicator={
				<Icon type="loading" style={{ fontSize: '4rem' }} spin />
			}
		/>
	</div>
);

export default LoadingPage;

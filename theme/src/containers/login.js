import React, { Fragment } from 'react';
import { text } from '../lib/settings';
import MetaTags from '../components/metaTags';

const LoginContainer = () => (
	<Fragment>
		<MetaTags title={text.loginLabel} />
		<section className="section">
			<div className="container">
				<div className="content">
					<h1>{text.loginLabel}</h1>
					{text.loginLabel}
				</div>
			</div>
		</section>
	</Fragment>
);

export default LoginContainer;

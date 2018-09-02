import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';
import { text } from '../../lib/settings';
import MetaTags from '../common/components/metaTags';

const NotFoundContainer = () => (
	<Fragment>
		<MetaTags title={text.title404} />
		<section className="section">
			<div className="container">
				<div className="content">
					<h1>{text.title404}</h1>
					{text.text404}
				</div>
			</div>
		</section>
	</Fragment>
);

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(NotFoundContainer)
);

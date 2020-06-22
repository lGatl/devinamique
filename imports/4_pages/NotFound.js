import * as React from 'react';

import { connect } from 'react-redux';

import ErrorPage from './ErrorPage';

class NotFound extends React.Component {
	render() {
		return (
			<ErrorPage title={'404 Not Found'} message={"This url doesn't exist"} />
		);
	}
}

export default connect()(NotFound);

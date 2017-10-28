import React from 'react';

class EnsureSignedInContainer extends React.Component {
    render() {
        return this.props.children;
    }
}

export default EnsureSignedInContainer;
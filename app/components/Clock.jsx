import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];
        return (
            <svg
                id='clock1'
                preserveAspectRatio="xMaxYMax none"
                viewBox = {viewBox}
                >
                <circle cx={0} cy={0} r={50} />
            </svg>
        );
    }
}

export default Clock;

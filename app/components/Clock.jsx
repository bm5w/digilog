import React from 'react';
import styled, {keyframes} from 'styled-components';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    }

    handleAnimationEnd(e) {
        console.log("finished");
    }

    render() {
        const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];
        const radius = 100
        const lengthMinute = radius*.96;
        const lengthHour = radius*.8;

        let rotate = keyframes`
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(180deg);
          }
        `;

        const Move = styled.g`
          animation: ${rotate} 4s linear;
          animation-fill-mode: forwards;
        `;

        return (
            <svg
                id='clock1'
                preserveAspectRatio="xMaxYMax none"
                viewBox = {viewBox}
                >
                <circle cx={0} cy={0} r={radius}/>
                <line x1="0" y1="0" x2="0" y2={-lengthMinute} transform="rotate(0 0 0)" stroke="orange" stroke-width="5"/>
                <Move id="hy" onAnimationEnd={this.handleAnimationEnd}>
                    <line x1="0" y1="0" x2="0" y2={-lengthHour} transform="rotate(90 0 0)" stroke="orange" stroke-width="5"/>
                </Move>
            </svg>
        );
    }
}

export default Clock;

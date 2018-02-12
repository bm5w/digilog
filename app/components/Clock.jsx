import React from 'react';
import styled, {keyframes} from 'styled-components';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hourAnimating: false,
            minuteAnimating: false,
            hour: 0,
            minute: 0
        };

        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
        this.getHourElement = this.getHourElement.bind(this);
        this.getMinuteElement = this.getMinuteElement.bind(this);
        this.getElement = this.getElement.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.hour === nextState.hour && nextProps.minute === nextState.minute) {
            return false;
        }
    }

    handleAnimationEnd(e) {
        if(e.target.classList.contains("hourAnimation")){
            this.setState({
                hourAnimating: false,
                hour: this.props.hour
            });
        }
        if(e.target.classList.contains("minuteAnimation")){
            this.setState({
                minuteAnimating: false,
                minute: this.props.minute
            });
        }
    }

    // getDuration()
    getHourElement(radius) {
        const lengthPercent = 0.8;
        return this.getElement(radius, 'hour', lengthPercent);
    }

    getMinuteElement(radius) {
        const lengthPercent = 0.96;
        return this.getElement(radius, 'minute', lengthPercent);
    }

    getElement(radius, HM, linePercent) {
        const lineLength = radius*linePercent;
        let element = <line x1="0" y1="0" x2="0" y2={-lineLength} transform="rotate({this.state[HM]} 0 0)" stroke="orange" stroke-width="5"/>;
        if (this.state[HM] !== this.props[HM]) {
            let rotate= keyframes`
              0% {
                transform: rotate(${this.state[HM]}deg);
              }
              100% {
                transform: rotate(${this.props[HM]}deg);
              }
            `;

            let Move= styled.g`
              animation: ${rotate} 4s linear;
              animation-fill-mode: forwards;
            `;
            let newState = {};
            newState[HM + "Animating"] = true;
            this.setState(newState);
            element = (<Move className="{HM}Animation" onAnimationEnd={this.handleAnimationEnd}>
                <line x1="0" y1="0" x2="0" y2={-lineLength} transform="rotate({this.state[HM]} 0 0)" stroke="orange" stroke-width="5"/>
            </Move>); 
        }
        return element;
    }

    render() {
        const radius = 100
        const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];
        const lengthMinute = radius*.96;

        let hour = this.getHourElement(radius);
        let minute = this.getMinuteElement(radius);

        return (
            <svg
                id='clock1'
                preserveAspectRatio="xMaxYMax none"
                viewBox = {viewBox}
                >
                <circle cx={0} cy={0} r={radius}/>
                {minute}
                {hour}
            </svg>
        );
    }
}

export default Clock;

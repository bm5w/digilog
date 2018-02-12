import React from 'react';
import styled, {keyframes} from 'styled-components';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hourAnimating: true,
            minuteAnimating: true,
            hour: 0,
            minute: 0
        };

        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
        this.getHourElement = this.getHourElement.bind(this);
        this.getMinuteElement = this.getMinuteElement.bind(this);
        this.getElement = this.getElement.bind(this);
        this.getDuration = this.getDuration.bind(this);
        this.getFinalPosition = this.getFinalPosition.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if (nextProps.hour === nextState.hour && nextProps.minute === nextState.minute) {
        //     return false;
        // }
        if (nextState.hourAnimating || nextState.minuteAnimating) {
            return false;
        }
        return true;
    }

//     componentWillMount() {
//         ['hour', 'minute'].forEach((hand) => {
//             if (this.props[hand] !== this.state[hand]) {
//                 let newState = {};
//                 newState[hand + "Animating"] = true;
//                 console.log(newState);
//                 this.setState((prevState, props) => {
//                     return { 
//                         ...prevState,
//                         newState
//                     }
//                 });
//             }
//         });
//     }

    handleAnimationEnd(e) {
        ["hour", "minute"].forEach((hand) => {
            if(e.target.classList.contains(hand+"Animation")){
                let newState = {};
                newState[hand+"Animating"] = false;
                newState[hand] = this.props[hand];
                this.setState((prevState, props) => {
                    return { 
                        prevState,
                        ...newState
                    }
                });
            }
        });
        // if(e.target.classList.contains("minuteAnimation")){
        //     this.setState((prevState, props) => {
        //         return { 
        //             ...prevState,
        //             minuteAnimating: false,
        //             minute: props.minute
        //         }
        //     });
        // }
    }

    getDuration(hand) {
        const durationFullRotation = 8; // seconds for full rotation;
        const finalPosition = this.getFinalPosition(hand);
        let duration = Math.abs(this.state[hand] - finalPosition)/360 * durationFullRotation;
        return duration;
    }

    getHourElement(radius) {
        const lengthPercent = 0.8;
        return this.getElement(radius, 'hour', lengthPercent);
    }

    getMinuteElement(radius) {
        const lengthPercent = 0.96;
        return this.getElement(radius, 'minute', lengthPercent);
    }

    getFinalPosition(hand) {
        let finalPosition = this.props[hand];
        if (Math.abs(this.state[hand]-this.props[hand]) > 180){
            finalPosition = 180-this.props[hand];
        }
        return finalPosition;
    }

    getElement(radius, hand, linePercent) {
        const lineLength = radius*linePercent;
        let element = <line x1="0" y1="0" x2="0" y2={-lineLength} transform={"rotate("+this.state[hand]+" 0 0)"} stroke="orange" strokeWidth="5"/>;
        const finalPosition = this.getFinalPosition(hand);
        const duration = this.getDuration(hand);
        if (this.state[hand] !== this.props[hand]) {
            let rotate= keyframes`
              0% {
                transform: rotate(${this.state[hand]}deg);
              }
              100% {
                transform: rotate(${finalPosition}deg);
              }
            `;

            let Move= styled.g`
              animation: ${rotate} ${duration}s linear;
              animation-fill-mode: forwards;
            `;
            const className = hand + "Animation";
            element = (<Move className={className} onAnimationEnd={this.handleAnimationEnd}>
                {element}
            </Move>); 
        }
        return element;
    }

    render() {
        const radius = 100
        const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];

        const hour = this.getHourElement(radius);
        const minute = this.getMinuteElement(radius);

        console.log(this.state);
        return (
            <svg id='clock1'
                preserveAspectRatio="xMaxYMax none"
                viewBox={viewBox} >
                <circle cx={0} cy={0} r={radius}/>
                {minute}
                {hour}
            </svg>
        );
    }
}

export default Clock;

import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock.jsx';

class ClockFixture extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hour: 180,
            minute: 270
        }

        this.setHour = this.setHour.bind(this);
        this.setMinute = this.setMinute.bind(this);
    }

    setHour(event) {
        debugger;

    }

    setMinute(event) {
        debugger;

    }


    render() {
        return (
            <Clock 
                hour={this.state.hour}
                minute={this.state.minute}
                setHour={this.setHour}
                setMinute={this.setMinute}/>
        )
    }
}

export default ClockFixture;

import React from 'react';
import ReactDOM from 'react-dom';
import ClockFixture from './components/ClockFixture.jsx';
require("./index.css");

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ClockFixture hour={180} minute={270}/>
        )
    }
}

export default App;

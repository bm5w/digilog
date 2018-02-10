import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/Clock.jsx';
require("./index.css");

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Clock/>
            </div>
        )
    }
}

export default App;

import React from 'react'
import GoldenLayoutWrapper from './components/GoldenLayoutWrapper';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
import initialState from './reducers/initialState.js'
import AgGridFileView from './components/AgGridFileView.jsx'

import '../css/main.css';
import '../css/styles.css';

const store = createStore(reducer, initialState, devToolsEnhancer());

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { tabs: ['Report 1', 'Report2', 'report3', '6', '7', '8', '9'] }
    }

    render() {
         return (
            <div>
                {
                    this.state.tabs.map((title, index) => {
                        return (<GoldenLayoutWrapper
                            component={AgGridFileView}
                            name={'AgGridFileView'+index}
                            report={title} key={index}/>)
                    })
                }
            </div>
        )
    }


}

ReactDOM.render(
    <Provider store={store}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);

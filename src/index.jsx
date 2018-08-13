import React from 'react'
import GoldenLayoutWrapper from './components/GoldenLayoutWrapper';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
import initialState from './reducers/initialState.js'
import HeaderComponent from './components/HeaderComponent.js'
import '../css/main.css';
import '../css/styles.css';

const store = createStore(reducer, initialState, devToolsEnhancer());

class App extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <HeaderComponent  />
                <GoldenLayoutWrapper  />
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

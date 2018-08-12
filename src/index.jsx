import GoldenLayoutWrapper from './components/GoldenLayoutWrapper';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
import initialState from './reducers/initialState.js'
import '../css/main.css';
import '../css/styles.css';

const store = createStore(reducer, initialState, devToolsEnhancer());

// ReactDOM.render(
//     <Provider store={store}>
//         <FileView />
//     </Provider>,
//     document.getElementById('root')
// );


ReactDOM.render(
    <Provider store={store}>
        <GoldenLayoutWrapper />
    </Provider>,
    document.getElementById('root')
);

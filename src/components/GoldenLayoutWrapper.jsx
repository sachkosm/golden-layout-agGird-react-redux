import GoldenLayout from 'golden-layout';
import { Provider } from 'react-redux';
import AgGridFileView from './AgGridFileView.jsx'
import HeaderComponent from './HeaderComponent.js'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from '../reducers/actionCreators';
import $ from 'jquery'

class GoldenLayoutWrapper extends React.Component {
    constructor(props, context) {
        super(props)
    }

    createGL(props, store, rootEl, config) {
        //$('#HeaderComponentIconPlus').on('click', function () {

        function wrapComponent(Component, store, props) {
            class Wrapped extends React.Component {
                render() {
                    return (
                        <Provider store={store}>
                            <Component {...props} />
                        </Provider>
                    );
                }
            }
            return Wrapped;
        };

        if (window.GoldenLayoutWrapper) {
            if (window.GoldenLayoutWrapper.layout) {
                // window.GoldenLayoutWrapper.layout.destroy();
                //Adding children
                //setInterval is needed - because trying to add children may fail.
                //We need to wait for the layout.root to be actually created and added to the layout.
                let intervalID = setInterval(() => {
                    let rootContainer = (!window.GoldenLayoutWrapper.layout.root) ? window.GoldenLayoutWrapper.layout.contentItems[0] : window.GoldenLayoutWrapper.layout.root;
                    if (rootContainer) {
                        clearInterval(intervalID)
                        let newItemConfig = {
                            type: 'react-component',
                            component: props.name
                        };
                        window.GoldenLayoutWrapper.layout.registerComponent(props.name, wrapComponent(props.component, store, props));
                        window.GoldenLayoutWrapper.layout.root.contentItems[0].addChild(newItemConfig);
                        //this.layout.updateSize();                     
                    } else {
                        return
                    }
                }, 10);
            }
        } else {
            //Initial GL Creation
            let config = {
                content: [{
                    type: 'stack',
                    content: [{
                        type: 'react-component',
                        component: props.name
                    }]
                }]
            };

            let layout = new GoldenLayout(config, rootEl);
            window.GoldenLayoutWrapper = {} //Creating a global variable space
            window.GoldenLayoutWrapper.layout = layout;
            layout.registerComponent(props.name, wrapComponent(props.component, store, props));
            layout.init();
            window.addEventListener('resize', () => { layout.updateSize(); });
        }
    }

    componentDidMount() {
        this.createGL(this.props, this.context.store, this.layout)
    }
    render() {
        return (
            <div className='goldenLayout' ref={input => this.layout = input} />
        );
    }
}

// ContextTypes must be defined in order to pass the redux store to exist in
// "this.context". The redux store is given to GoldenLayoutWrapper from its
// surrounding <Provider> in index.jsx.
GoldenLayoutWrapper.contextTypes = {
    store: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ glConfig: state.glConfig, addReport: state.addReport });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(GoldenLayoutWrapper);


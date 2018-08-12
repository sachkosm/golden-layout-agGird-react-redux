import GoldenLayout from 'golden-layout';
import { Provider } from 'react-redux';
import AgGridFileView from './AgGridFileView.jsx'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from '../reducers/actionCreators';

class GoldenLayoutWrapper extends React.Component {

    shouldComponentUpdate(nextProps, nextState){

    }
    componentDidMount() {
        function wrapComponent(Component, store) {
            class Wrapped extends React.Component {
                render() {
                    return (
                        <Provider store={store}>
                            <Component {...this.props} />
                        </Provider>
                    );
                }
            }
            return Wrapped;
        };

        //Manipulate dynamically the layout by modifying the redux store - glconfig - using actions
        var layout = new GoldenLayout(this.props.glConfig, this.layout);
        console.log(layout)
        window.layout = layout;
        //We can register a component once and then use it multiple times with the same name in the configuration
        layout.registerComponent('FileView',
            wrapComponent(AgGridFileView, this.context.store)
        );
        // //Additional Registering is needed only if we are going to use a different component.
        // layout.registerComponent('FileView1',
        //     wrapComponent(AgGridFileView_2, this.context.store)
        // );
        // layout.registerComponent('FileView2',
        //     wrapComponent(AgGridFileView_3, this.context.store)
        // );

        layout.init();

        window.addEventListener('resize', () => {
            layout.updateSize();
        });

        window.addEventListener('dblclick', () => {
            console.log('dbclick')
            var newItemConfig = {
                type: 'react-component',
                component: 'FileView'
            };
            layout.root.contentItems[0].addChild(newItemConfig);
            //layout.updateSize();
        });
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


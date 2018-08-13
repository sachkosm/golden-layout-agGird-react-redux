import GoldenLayout from 'golden-layout';
import { Provider } from 'react-redux';
import AgGridFileView from './AgGridFileView.jsx'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from '../reducers/actionCreators';
import $ from 'jquery'

class GoldenLayoutWrapper extends React.Component {
    constructor(props, context) {
        super(props)
        this.addAddNewReportEvent = this.addAddNewReportEvent.bind(this)
        this.addNewReport = this.addNewReport.bind(this)

        console.log('this.props.addNewReport ' + props.addNewReport)
    }
    //Not in use
    addAddNewReportEventWithTest() {
        //When this function is executed the callBack function will be executed every 10 milliseconds
        var interval = setInterval(function () {
            var el = $('#HeaderComponentIconPlus'), i;
            if (el === null) {
                return;
            }
            console.log('tetsing')
            console.log(el)
            clearInterval(interval);

            el.on('click', function() {
                console.log('click')
                var newItemConfig = {
                    type: 'react-component',
                    component: 'FileView'
                };
                layout.root.contentItems[0].addChild(newItemConfig);
                //this.layout.updateSize();
            });

        }.bind(this), 10);
    };
    addAddNewReportEvent() {
         $('#HeaderComponentIconPlus').on('click', function () {
                console.log('click-AddNewReport')
                var newItemConfig = {
                    type: 'react-component',
                    component: 'FileView'
                };
                layout.root.contentItems[0].addChild(newItemConfig);
                //this.layout.updateSize();
            });
    };

    addNewReport(params){
        
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return true
    // }
    
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

        this.addAddNewReportEvent();

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


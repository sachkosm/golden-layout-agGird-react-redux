
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import classNames from 'classnames';
import AgGridFileView from './AgGridFileView.jsx'
import GoldenLayout from 'golden-layout';
// require('golden-layout/src/css/goldenlayout-base.css');
// require('golden-layout/src/css/goldenlayout-dark-theme.css');
import _ from 'lodash';

/**
* Triggers a window resize event. The same event
* that would fire if you physically resized the
 * app.
 *
* We throttle this function to 100ms
*
*/

const triggerWindowResize = _.throttle(() => {
    setTimeout(() => window.dispatchEvent(new Event('resize')));
}, 100)


/**
* Dock - Is a custom wrapping of the
 * goldenlayout workspace manager.
*/

class Dock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeConfig: null
        }
        this.dockReadyResolver;
        this.dockReady = new Promise((resolve) => { this.dockReadyResolver = resolve });
        this.onWindowBoundsChanging = this.onWindowBoundsChanging.bind(this);
    }

    /**
     * Adds a new component to the Dock
     * @param {string} title the name of new tab
     * @param {string} type of registered goldenlayout component
     * @param {object} props properties to pass to the component
     * @example <caption>Adding a registered component to the dock</caption>
     *
     * const dock = dockRef.current.golden();
     *
     * dock.addComponent(
     *     'My new tab',
     *     'MyCustomTabType',
     *     {
     *        content: 'Hello World'
     *     }
     * )
     */
    async addComponent(title, component, props) {
        //         dock.addComponent(id, 'RRAReport', {screenConfig: spec, screenId: id, request})
        await this.dockReady
        const golden = this.golden()
        const rootContainer = (golden.root.contentItems[0]) ? golden.root.contentItems[0] : golden.root;
        rootContainer.addChild({
            type: 'react-component',
            title: title,
            component: AgGridFileView,
            props: props
        })
    }

    /**
     * Checks if we need to rebuild the dock
     * @private
     * @param {object} nextProps the new properties we are recieving
     * @param {object} nextState the new react state before it gets applied
     * @returns {Boolean} Always returns true so we can apply themeing to it
     */

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.golden().isInitialised) {
            return false
        }
        const isCurrentLayout = _.isEqual(nextProps.dockConfig, this.golden().toConfig())
        const isNewLayout = !_.isEqual(nextProps.dockConfig, this.props.dockConfig) && !isCurrentLayout;
        if (isNewLayout) {
            this.createGolden(nextProps.dockConfig)
        }
        return true; //We are not a native react control, so we never want to trigger a re-render
    }

    /**
     * Returns the current instance of the dock object.
     * @returns {GoldenLayout} returns the current instance of the goldenlayout dock
     */

    golden() {
        return this._golden;
    }

    componentDidMount() {
        this.createGolden();
        // This is kind of a crappy solution because it assumes that we are
        // only adjusting width when the whole app resizes. The problem is
        // if we were adding a resizer for a dom element it wont trigger update.
        // if(fin){
        // fin.desktop.Window.getCurrent().addEventListener('bounds-changing', this.onWindowBoundsChanging);
        // fin.desktop.Window.getCurrent().addEventListener('maximized', this.onWindowBoundsChanging);
        // fin.desktop.Window.getCurrent().addEventListener('restored', this.onWindowBoundsChanging);
         window.addEventListener('resize', this.onWindowBoundsChanging)
         this.dockReadyResolver(this.golden.bind(this));
         if (this.props.onDockReady) {
           this.props.onDockReady(this, this.golden.bind(this))
         }
         
    }

    /**
     * Called whenever a window resize event is fired. This will
     * attempt to resize the dock to fit its parents height
     * and width.
     * @private
     */
    onWindowBoundsChanging() {
        if (!this.golden().container.width) {
            return;
        }
        const width = this.golden().container.width();
        const height = this.golden().container.height();
        if ((width != this.golden().width) || (height != this.golden().height)) {
            this.golden().updateSize(
                width,
                height - 6 //This is to compensate for some headers but may no longer be needed
            );
        }
    }

    /**
     * Called whenever a new tab group is created in the dock
     * @private
     * @param {object} stack the new goldenlayout stack object
     */
    stackCreated(stack) {
        triggerWindowResize()
        stack.on('activeContentItemChanged', this.activeContentItemChanged.bind(this))
    }

    /**
     * Called whenever a tab is swapped within the dock
     */
    activeContentItemChanged(contentItem) {
        triggerWindowResize();
        this.setState({
            activeConfig: contentItem.config
        })
        if (this.props.onActiveItemChange) {
            this.props.onActiveItemChange(this, contentItem)
        }
    }

    /**
     * Destroys the current and creates a new GoldenLayout object. This will
     * clear the current instance and rebind all callbacks that arent static.
     * @private
     *
     * @param {object} config optional config settings to pass to the GoldenLayout object upon creation.
     */
    createGolden(config = null) {
        if (this._golden) {
            this._golden.destroy();
        }

        //const root = ReactDOM.findDOMNode('root');
        const root = document.getElementById('dock');
        const defaults = {
            content: [],
            settings: {
                selectionEnabled: true,
                showPopoutIcon: false
            },
            //Dont think we need this anymore now that we arent using flexmonster
            // dimensions: {
            //     headerHeight: 39
            // }
        }

        this._golden = new GoldenLayout(Object.assign(defaults, config || this.props.dockConfig))
        this._golden.on('stackCreated', this.stackCreated.bind(this))

        if (this.props.onLayoutChange) {
            this._golden.on('stateChanged', () => {
                triggerWindowResize();
                const config = this._golden.toConfig();
                const currCfg = this.props.dockConfig;
                if (!_.isEqual(config, currCfg)) {
                    this.props.onLayoutChange(this, this._golden, this._golden.toConfig())
                }
            })
        }
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

        this._golden.container = root;
        //for (let [name, component] of Object.entries(this.props.components)) {
        this._golden.registerComponent('AgGridFileView', wrapComponent(AgGridFileView, this.context.store))
        //}
        setTimeout(() => {
            this._golden.init();  
            this.addComponent('title', 'component')
        })
    }
    render() {
        
        let { classes } = this.props;
        return (
           <div id='dock' > </div>
        )
    }
}
Dock.contextTypes = {
    store: PropTypes.object.isRequired
};


export default Dock;


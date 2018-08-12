
import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actions } from '../reducers/actionCreators';


class HeaderComponent extends React.Component {
    constructor(props, context) {
        super(props)
    }

    render() {

        return (
            <div style={{ height: '25px' }}><span style={{float: 'right'}} >Double click to add new report <i className='fa fa-plus-square fa-lg' /></span></div>
        )
    }

}

const mapStateToProps = (state) => ({ glConfig: state.glConfig });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
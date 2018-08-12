
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
            <div style={{ height: '25px' }}><span style={{ float: 'left' }} >Select a date to run the report <i className='fa fa-info-circle fa-sm' />&nbsp;|&nbsp;Add new report <i id="HeaderComponentIconPlus" className='fa fa-plus-square fa-sm' /></span></div>
        )
    }

}

const mapStateToProps = (state) => ({ glConfig: state.glConfig });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
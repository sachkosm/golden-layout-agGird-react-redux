
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
            <div style={{ height: '25px' }}>
                <div style={{ float: 'left', paddingLeft: '15px' }} >Click on the calendar icon and select a date to run the report <i style={{  paddingRight: '20px' }} className='fa fa-info-circle fa-sm' />   
                    Add new report <i style={{ paddingRight: '20px' }} id="HeaderComponentIconPlus" className='fa fa-plus-square fa-sm' />   
                    Right click on item for more actions <i style={{ paddingRight: '20px' }} className='fa fa-info-circle fa-sm' />
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
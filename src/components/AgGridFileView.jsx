import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { AgGridReact } from "ag-grid-react";
import { actions } from '../reducers/actionCreators';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import Moment from 'moment';
import "ag-grid-enterprise";



class FileBrowser extends Component {
    constructor(props) {
        super(props)
        this.onRowDragEnd = this.onRowDragEnd.bind(this)
        this.getContextMenuItems = this.getContextMenuItems.bind(this)
        this.onGridReady = this.onGridReady.bind(this)
        this.selectedDateChange = this.selectedDateChange.bind(this)
        this.state = {
            startDate: new Date().toDateString(),
            selectedNewDate: null
        }
    }

    onGridReady(params) {
        params.api.sizeColumnsToFit()
    }

    onRowDragEnd(event) {
        if (event.overNode.data.file) return;

        let movingFilePath = event.node.data.filePath;
        let targetPath = event.overNode.data.filePath;

        this.props.actions.moveFiles(movingFilePath, targetPath);
    };

    getContextMenuItems(params) {
        if (!params.node) return [];
        let filePath = params.node.data ? params.node.data.filePath : [];

        let deleteItem = {
            name: "Delete",
            action: () => this.props.actions.deleteFiles(filePath)
        };

        let newItem = {
            name: "New",
            action: () => this.props.actions.newFile(filePath)
        };

        return params.node.data.file ? [deleteItem] : [newItem, deleteItem];
    };
    selectedDateChange(params) {
        console.log(params)
        this.setState({selectedNewDate: params})
    }

    render() {
        return (
            <div style={{ height: 500 }} className="ag-theme-balham" >
                {this.props.name}
                <DatePickerInput
                    value={this.state.startDate}
                    onChange={this.selectedDateChange}
                    autoClose={true}
                />
                {this.state.selectedNewDate ?
                <AgGridReact  {...this.props.agGridConfig} /> : null}

 
            </div>
        )
    }

}

const mapStateToProps = (state) => ({ agGridConfig: state.agGridConfig });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowser);
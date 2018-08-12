import FileCellRenderer from '../components/FileCellRenderer.jsx';
const data = [
    { id: 1, file: false, filePath: ['Documents'] },
    { id: 2, file: false, filePath: ['Documents', 'txt'] },
    { id: 3, file: true, filePath: ['Documents', 'txt', 'notes.txt'], dateModified: '21 May 2017, 01:50:30', size: 14.7 },
    { id: 4, file: false, filePath: ['Documents', 'pdf'] },
    { id: 5, file: true, filePath: ['Documents', 'pdf', 'book.pdf'], dateModified: '20 May 2017, 01:50:36', size: 2.1 },
    { id: 6, file: true, filePath: ['Documents', 'pdf', 'cv.pdf'], dateModified: '20 May 2016, 11:50:26', size: 2.4 },
    { id: 7, file: false, filePath: ['Documents', 'xls'] },
    { id: 8, file: true, filePath: ['Documents', 'xls', 'accounts.xls'], dateModified: '12 Aug 2016, 10:50:05', size: 4.3 },
    { id: 9, file: false, filePath: ['Documents', 'stuff'] },
    { id: 10, file: true, filePath: ['Documents', 'stuff', 'xyz.txt'], dateModified: '17 Jan 2016, 08:03:12', size: 1.1 },
    { id: 11, file: false, filePath: ['Music'] },
    { id: 12, file: false, filePath: ['Music', 'mp3'] },
    { id: 13, file: true, filePath: ['Music', 'mp3', 'theme.mp3'], dateModified: '11 Sep 2016 08:03:07', size: 14.3 },
    { id: 14, file: true, filePath: ['temp.txt'], dateModified: '12 Aug 2016, 10:50:42', size: 101 }
]
const initialState = {
    glConfig:
    {
        settings: {
            hasHeaders: true,
            constrainDragToContainer: true,
            reorderEnabled: true,
            selectionEnabled: false,
            popoutWholeStack: false,
            blockedPopoutsThrowError: true,
            closePopoutsOnUnload: true,
            showPopoutIcon: true,
            showMaximiseIcon: true,
            showCloseIcon: true
        },
        dimensions: {
            borderWidth: 5,
            minItemHeight: 10,
            minItemWidth: 10,
            headerHeight: 20,
            dragProxyWidth: 300,
            dragProxyHeight: 200
        },
        labels: {
            close: 'close',
            maximise: 'maximise',
            minimise: 'minimise',
            popout: 'open in new window'
        },
        content: [{
            type: 'row',
            content: [{
                type: 'react-component',
                component: 'FileView'
            }, {
                type: 'react-component',
                component: 'FileView'
            }, {
                type: 'column',
                content: [{
                    type: 'react-component',
                    component: 'FileView'
                }, {
                    type: 'react-component',
                    component: 'FileView'
                }]
            }]
        }],
        glLayoutOtherSettings: {}
    },
    agGridConfig: {
        columnDefs: [{ field: "dateModified" }, { field: "size" }],
        rowData: data,
        treeData: true,
        enableFilter: true,
        groupDefaultExpanded: -1,
        getDataPath: data => data.filePath,
        autoGroupColumnDef: {
            headerName: "Files",
            rowDrag: true,
            sort: 'asc',
            width: 250,
            cellRendererParams: {
                suppressCount: true,
                innerRenderer: "fileCellRenderer"
            }
        },
        onGridReady: this.onGridReady,
        getContextMenuItems: this.getContextMenuItems,
        deltaRowDataMode: true,
        getRowNodeId: data => data.id,
        onRowDragEnd: this.onRowDragEnd,
        frameworkComponents: {
            fileCellRenderer: FileCellRenderer
        }
        //}
    },
    'count': 10
}


export default initialState;
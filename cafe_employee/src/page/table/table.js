'use strict';
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import './table.scss';
import BtnRenderer from './btnRenderer';

const Table = ({
    columnDefs,
    defaultColDef,
    rowData,
    onEdit,
    onDelete
}) => {
    columnDefs = [...columnDefs, {
        field: 'action',
        maxWidth: 100,
        cellRenderer: BtnRenderer,
        cellRendererParams: {
            edit: data => onEdit(data),
            delete: data => onDelete(data)
        },
    }];
    defaultColDef = {
        editable: false,
        sortable: true,
        filter: true,
        resizable: true,
        ...defaultColDef
    }

    return (
        <div className="ag-theme-alpine" style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            ></AgGridReact>
        </div>
    );
};

export default Table;
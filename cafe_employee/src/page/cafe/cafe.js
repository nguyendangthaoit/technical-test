
import React, { useEffect, useState } from 'react';
import Table from "../table/table";
import { useDispatch } from 'react-redux';
import { LOAD_CAFES_LOADING } from '../../uitls/constant'
import { useSelector } from 'react-redux';
import ImgRenderer from '../table/imgRenderer';
import Filter from '../share/filter';
const Cafe = () => {
    const columnDefs = [
        { field: 'name' },
        { field: 'logo', cellRenderer: ImgRenderer },
        { field: 'description' },
        { field: 'employees' },
        { field: 'location' }];
    const dispatch = useDispatch();
    const datas = useSelector(store => store.CafeReducer.data);

    useEffect(() => {
        dispatch({ type: LOAD_CAFES_LOADING, payload: '' });
    }, [])

    const onSearch = (location) => {
        dispatch({ type: LOAD_CAFES_LOADING, payload: location });
    }
    const onAdd = () => {

    }

    const onEdit = (data) => {
        alert(1);
    }
    const onDelete = (data) => {
        alert(2);
    }
    return (
        <div className="container">

            <Filter placeholder={'location'} onSearch={onSearch} onAdd={onAdd} />

            <div>
                <Table
                    columnDefs={columnDefs}
                    rowData={datas}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        </div>

    );
}


export default Cafe;
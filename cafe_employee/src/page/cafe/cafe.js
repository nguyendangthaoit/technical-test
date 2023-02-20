
import React, { useEffect, useState } from 'react';
import Table from "../table/table";
import { useDispatch } from 'react-redux';
import { LOAD_CAFES_LOADING } from '../../uitls/constant'
import { useSelector } from 'react-redux';
import ImgRenderer from '../table/imgRenderer';
import LinkRenderer from '../table/linkRenderer';
import Filter from '../share/filter';
import CafeModal from './modal';
import Swal from 'sweetalert2';
import * as api from "../../service/cafe.service";
import { toast } from 'react-toastify';
import { hideLoad, showLoad } from './../../uitls/loading';
import './cafe.scss';
const Cafe = () => {
    const dispatch = useDispatch();
    const cafeReducer = useSelector(store => store.CafeReducer);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [itemEdit, setItemEdit] = useState(null);
    const [location, setLocation] = useState('');
    const columnDefs = [
        { field: 'logo', cellRenderer: ImgRenderer },
        { field: 'name' },
        { field: 'description' },
        { field: 'employees', cellRenderer: LinkRenderer },
        { field: 'location' }];

    useEffect(() => {
        dispatch({ type: LOAD_CAFES_LOADING, payload: '' });
    }, [])

    useEffect(() => {
        if (cafeReducer.loading) showLoad();
        else hideLoad();
    }, [cafeReducer.loading])

    const onSearch = (location) => {
        setLocation(location);
        dispatch({ type: LOAD_CAFES_LOADING, payload: location });
    }
    const onAdd = () => {
        setItemEdit(null);
        setIsOpenModal(true);
    }

    const onEdit = (data) => {
        setItemEdit(data);
        setIsOpenModal(true);
    }
    const onDelete = (data) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delCafe(data.id).then(res => {
                    if (res.status) {
                        toast.success("Deleted successfully.");
                        dispatch({ type: LOAD_CAFES_LOADING, payload: location });
                    } else
                        toast.warning(res.message);
                }).catch((error) => {
                    toast.warning("Deleted unsuccessfully.");
                });
            }
        })
    }
    const onClose = () => {
        setIsOpenModal(false);
        dispatch({ type: LOAD_CAFES_LOADING, payload: location });
    }
    return (
        <div className="container">

            <Filter placeholder={'location'} onSearch={onSearch} onAdd={onAdd} />

            <div>
                <Table
                    columnDefs={columnDefs}
                    rowData={cafeReducer.data}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
            {isOpenModal && <CafeModal item={itemEdit} close={() => onClose()} />}

        </div >

    );
}


export default Cafe;
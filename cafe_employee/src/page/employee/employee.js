
import React, { useEffect, useState } from 'react';
import Table from "../table/table";
import { useDispatch } from 'react-redux';
import { LOAD_EMPLOYEES_LOADING } from '../../uitls/constant'
import { useSelector } from 'react-redux';
import Filter from '../share/filter';
import EmployeeModal from './modal';
import Swal from 'sweetalert2';
import * as api from "../../service/employee.service";
import { toast } from 'react-toastify';
import { hideLoad, showLoad } from './../../uitls/loading';
import './employee.scss';
import { useSearchParams } from 'react-router-dom';
const Employee = () => {
    const dispatch = useDispatch();
    const employeeReducer = useSelector(store => store.EmployeeReducer);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [itemEdit, setItemEdit] = useState(null);
    const [cafe, setCafe] = useState('');

    const [searchParams] = useSearchParams();
    const cafeParam = searchParams.get('cafe');
    const columnDefs = [
        { field: 'id', headerName: 'Employee id' },
        { field: 'name' },
        { field: 'email_address', headerName: 'Email address' },
        { field: 'phone_number', headerName: 'Phone number' },
        { field: 'cafe', headerName: 'Café name' },
        { field: 'days_worked', headerName: 'Days worked in the café' }];

    useEffect(() => {
        dispatch({ type: LOAD_EMPLOYEES_LOADING, payload: cafeParam || '' });
    }, [cafeParam])

    useEffect(() => {
        if (employeeReducer.loading) showLoad();
        else hideLoad();
    }, [employeeReducer.loading])

    const onSearch = (cafe) => {
        setCafe(cafe);
        dispatch({ type: LOAD_EMPLOYEES_LOADING, payload: cafe });
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
                api.delEmployee(data.id).then(res => {
                    if (res.status) {
                        toast.success("Deleted successfully.");
                        dispatch({ type: LOAD_EMPLOYEES_LOADING, payload: cafe });
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
        dispatch({ type: LOAD_EMPLOYEES_LOADING, payload: cafe });
    }
    return (
        <div className="container">

            <Filter placeholder={'cafe'} onSearch={onSearch} onAdd={onAdd} />

            <div>
                <Table
                    columnDefs={columnDefs}
                    rowData={employeeReducer.data}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
            {isOpenModal && <EmployeeModal item={itemEdit} close={() => onClose()} />}

        </div >

    );
}


export default Employee;
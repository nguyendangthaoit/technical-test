import React, { useEffect, useState } from 'react';
import { Model, Valid } from "./model";
import * as api from "../../service/employee.service";
import { MESSAGESERR } from '../../uitls/constant';
import { toast } from 'react-toastify';
import { showLoad, hideLoad } from '../../uitls/loading';
import Textbox from '../share/textbox';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { LOAD_CAFES_LOADING } from '../../uitls/constant'
export default function EmployeeModal(props) {
    const [fields, setFields] = useState({ ...Model });
    const [errors, setErrors] = useState({ ...Valid });
    const [isSaved, setIsSaved] = useState(true);
    const dispatch = useDispatch();
    const cafeReducer = useSelector(store => store.CafeReducer);
    const genders = ['Male', 'Female'];
    useEffect(() => {
        setErrors({ ...Valid });
        if (props.item) {
            setFields(props.item);
        } else
            setFields({ ...Model });
    }, [props.item])

    useEffect(() => {
        dispatch({ type: LOAD_CAFES_LOADING, payload: '' });
    }, [])


    const handleValidation = (field, fieldsT) => {
        let errorsT = { ...errors };
        if (field)
            errorsT[field] = '';
        validateReqire(field, fieldsT, errorsT, Object.keys({ ...Valid }));
        setErrors(errorsT);
        return Object.values(errorsT).every(x => !x);
    }
    const validateReqire = (field, fieldsT, errorsT, fiels = []) => {
        fiels.forEach(item => {
            if (field === item || !field) {
                if (!fieldsT[item] || (Array.isArray(fieldsT[item]) && !fieldsT[item][0]))
                    errorsT[item] = MESSAGESERR.field_required;
            }
        });
    }
    const handleChange = (field, value, err) => {
        let fieldsT = { ...fields };
        fieldsT[field] = value;
        setFields(fieldsT);

        let errorsT = { ...errors };
        errorsT[field] = err;
        setErrors(errorsT);

        setIsSaved(false);
    }


    const onChange = (e, field) => {
        let fieldsT = { ...fields };
        fieldsT[field] = e.target.value;
        handleValidation(field, fieldsT);
        setFields(fieldsT);
        setIsSaved(false);
    }

    const onRadioChange = (value) => {
        let fieldsT = { ...fields };
        fieldsT.gender = value;
        handleValidation('gender', fieldsT);
        setFields(fieldsT);
        setIsSaved(false);
    }

    const save = async () => {
        if (handleValidation('', fields)) {
            if (!props.item) {
                await api.createEmployee(fields).then(res => {
                    if (res.status) {
                        toast.success("Added successfully.");
                        props.close();
                    } else
                        toast.warning(res.message);
                }).catch((error) => {
                    toast.warning("Added unsuccessfully.");
                });
            } else {
                await api.updateEmployee(fields).then(res => {
                    if (res.status) {
                        toast.success("Saved successfully.");
                        props.close();
                    } else
                        toast.warning(res.message);
                }).catch((error) => {
                    toast.warning("Saved unsuccessfully.");
                });
            }
        }
    };


    const close = () => {
        if (isSaved)
            props.close();
        else
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    save();
                } else if (result.isDenied) {
                    props.close();
                }
            })

    }
    return (
        <>
            <div className="fade modal show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.item ? 'Update' : 'Add'}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">

                                <Textbox lable={'Name'} isRequired={true} field={'name'} value={fields.name} error={errors.name} minLength={6}
                                    maxLength={10} onChange={handleChange} />

                                <Textbox lable={'Email Address'} isRequired={true} field={'email_address'} value={fields.email_address} error={errors.email_address}
                                    onChange={handleChange} />

                                <Textbox lable={'Phone Number'} isRequired={true} field={'phone_number'} value={fields.phone_number} error={errors.phone_number}
                                    isNumber={true} maxLength={8} minLength={8} onChange={handleChange} />


                                <div className="col-lg-12 mb-3">
                                    <label className="form-label required">Gender</label>
                                    <div className="col-lg-12">
                                        {
                                            genders.map((item, i) =>
                                                <div className="form-check form-check-inline" key={i}>
                                                    <input className="form-check-input" type="radio" value={item}
                                                        checked={fields.gender === item} onChange={() => onRadioChange(item)} />
                                                    <label className="form-check-label" htmlFor="inlineRadio1">{item}</label>
                                                </div>
                                            )
                                        }
                                        <div className='errMes'>{errors.gender}</div>
                                    </div>

                                </div>
                                <div className="col-lg-12 mb-3">
                                    <label className="form-label required">Cafe</label>
                                    <select className={`form-control ${!!errors.cafe_id && 'is-invalid'}`}
                                        value={fields.cafe_id} onChange={(e) => onChange(e, 'cafe_id')}>
                                        <option value="">Select Cafe</option>
                                        {
                                            cafeReducer.data.map((e, i) =>
                                                <option value={e.id} key={i}>{e.name}</option>
                                            )
                                        }
                                    </select>
                                    <div className="invalid-feedback">{errors.cafe_id}</div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={save}>Submit </button>
                            <button type="button" className="btn btn-secondary" onClick={close}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
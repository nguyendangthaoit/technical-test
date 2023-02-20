import React, { useEffect, useState } from 'react';
import { Model, Valid } from "./model";
import * as api from "../../service/cafe.service";
import { MESSAGESERR } from '../../uitls/constant';
import { toast } from 'react-toastify';
import empImg from '../../asset/img/empty.jpg';
import { showLoad, hideLoad } from '../../uitls/loading';
export default function CafeModal(props) {
    const [fields, setFields] = useState({ ...Model });
    const [errors, setErrors] = useState({ ...Valid });

    useEffect(() => {
        setErrors({ ...Valid });
        if (props.item) {
            setFields(props.item);
        } else
            setFields({ ...Model });
    }, [props.item])

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
    const handleChange = (e, field) => {
        let fieldsT = { ...fields };
        fieldsT[field] = e.target.value;
        handleValidation(field, fieldsT);
        setFields(fieldsT);
    }
    const save = async () => {
        if (handleValidation('', fields)) {
            if (!props.item) {
                await api.createCafe(fields).then(res => {
                    if (res.status) {
                        toast.success("Added successfully.");
                        props.close();
                    } else
                        toast.warning(res.message);
                }).catch((error) => {
                    toast.warning("Added unsuccessfully.");
                });
            } else {
                await api.updateCafe(fields).then(res => {
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

    const addImage = (e) => {
        e.preventDefault();
        const input = document.getElementById("fileInputImage");
        input.click()
    }
    const handleChangeImage = (e) => {
        showLoad();
        const formData = new FormData();
        formData.append("img", e.target.files[0]);
        api.uploadImg(formData)
            .then(res => {
                hideLoad();
                if (res.img_path) {
                    let fieldsT = { ...fields };
                    fieldsT['logo'] = res.img_path;
                    setFields(fieldsT);
                    toast.success('Uploaded successfully');
                } else
                    toast.warning(res.message);
            }).catch((error) => {
                hideLoad();
                toast.warning("Uploaded unsuccessfully");
            });
    }

    return (
        <>
            <div className="fade modal show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{props.item ? 'Update' : 'Add'}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.close()}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="name" className="form-label col-12 col-lg-4 ">Logo</label>
                                    <img src={fields?.logo ? api.getImg(fields?.logo) : empImg} alt="logo" className="logo" onClick={addImage} />
                                    <input type="file" hidden id="fileInputImage" onChange={handleChangeImage} accept="image/*" />
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="name" className="form-label required">Name</label>
                                    <input type="text" className={`form-control ${!!errors.name && 'is-invalid'}`} name="name" id="name"
                                        value={fields.name || ''} onChange={(e) => handleChange(e, 'name')} />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="description" className="form-label required">Description</label>
                                    <textarea rows={2} type="text" className={`form-control ${!!errors.description && 'is-invalid'}`} name="description" id="description"
                                        value={fields.description || ''} onChange={(e) => handleChange(e, 'description')} />
                                    <div className="invalid-feedback">{errors.description}</div>
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="location" className="form-label required">Location</label>
                                    <input type="text" className={`form-control ${!!errors.location && 'is-invalid'}`} name="location" id="location"
                                        value={fields.location || ''} onChange={(e) => handleChange(e, 'location')} />
                                    <div className="invalid-feedback">{errors.location}</div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={save}>Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => props.close()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
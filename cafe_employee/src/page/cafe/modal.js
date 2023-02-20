import React, { useEffect, useState } from 'react';
import { Model, Valid } from "./model";
import * as api from "../../service/cafe.service";
import { MESSAGESERR } from '../../uitls/constant';
import { toast } from 'react-toastify';
import empImg from '../../asset/img/empty.jpg';
import { showLoad, hideLoad } from '../../uitls/loading';
import Textbox from '../share/textbox';
import Textarea from '../share/textarea';
import Swal from 'sweetalert2';
export default function CafeModal(props) {
    const [fields, setFields] = useState({ ...Model });
    const [errors, setErrors] = useState({ ...Valid });
    const [isSaved, setIsSaved] = useState(true);

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
    const handleChange = (field, value, error) => {
        let fieldsT = { ...fields };
        fieldsT[field] = value;
        setFields(fieldsT);

        let errorsT = { ...errors };
        errorsT[error] = error;
        setErrors(errorsT);

        setIsSaved(false);
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
        const file = e.target.files[0];

        const isBigSize = (file) => {
            const fsize = Math.round((file.size / 1024));
            return fsize > 20 ? true : false;
        };
        if (isBigSize(file)) {
            hideLoad();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Max 2mb validation',
            })
        } else {
            formData.append("img", file);
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

    }

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
                                <div className="col-lg-12 mb-3">
                                    <label htmlFor="name" className="form-label col-12 col-lg-4 ">Logo</label>
                                    <img src={fields?.logo ? api.getImg(fields?.logo) : empImg} alt="logo" className="logo" onClick={addImage} />
                                    <input type="file" hidden id="fileInputImage" onChange={handleChangeImage} accept="image/*" />
                                </div>

                                <Textbox lable={'Name'} isRequired={true} field={'name'} value={fields.name} error={errors.name} minLength={6}
                                    maxLength={10} onChange={handleChange} />

                                <Textarea lable={'Description'} isRequired={true} field={'description'} value={fields.description} error={errors.description}
                                    maxLength={256} row={2} onChange={handleChange} />

                                <Textbox lable={'location'} isRequired={true} field={'location'} value={fields.location} error={errors.location}
                                    onChange={handleChange} />

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
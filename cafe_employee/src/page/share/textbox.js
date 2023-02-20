import React, { useState } from 'react';
import { MESSAGESERR } from '../../uitls/constant';
import { useEffect } from 'react';

export default function Textbox({
    lable, isRequired, field, value, error,
    onChange, minLength, maxLength, isNumber }) {

    const [valueT, setValueT] = useState(value);
    const [errorT, setErrorT] = useState(error);

    useEffect(() => {
        setValueT(value)
    }, [value])

    useEffect(() => {
        setErrorT(error)
    }, [error])

    const handleChange = (e) => {
        const err = handleValidation(e.target.value);
        setValueT(e.target.value);
        setErrorT(err);
        onChange(field, e.target.value, err);
    }

    const handleValidation = (value) => {
        let errMes = '';
        if (!value && isRequired)
            errMes = MESSAGESERR.field_required;

        if (minLength && minLength > value.length)
            errMes = `Minimum ${minLength} character.`;

        if (field.includes('email') && value) {
            const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            const result = pattern.test(value);
            if (!result) {
                errMes = MESSAGESERR.email_required;
            }
        }
        if (field.includes('phone') && value) {
            const pattern = /^[89]/g;
            const result = pattern.test(value);
            if (!result) {
                errMes = MESSAGESERR.phone_required;
            }
        }
        return errMes;
    }
    const keyPressPhone = (e) => {
        if (isNumber && (e.charCode < 48 || e.charCode > 57))
            e.preventDefault();
    }
    return (
        <div className="col-lg-12 mb-3">
            <label htmlFor={field} className={`form-label ${isRequired && 'required'}`}>{lable}</label>
            <input type="text" className={`form-control ${!!errorT && 'is-invalid'}`} name={field} id={field}
                value={valueT || ''} onChange={(e) => handleChange(e)} maxLength={maxLength} onKeyPress={keyPressPhone} />
            <div className="invalid-feedback">{errorT}</div>
        </div>
    );
}


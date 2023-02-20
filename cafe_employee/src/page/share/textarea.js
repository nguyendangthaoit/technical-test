import React, { useState } from 'react';
import { MESSAGESERR } from '../../uitls/constant';
import { useEffect } from 'react';

export default function Textarea({
    lable, isRequired = false, field, value, error, onChange,
    minLength, maxLength, row }) {

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
        return errMes;
    }

    return (
        <div className="col-lg-12 mb-3">
            <label htmlFor={field} className={`form-label ${isRequired && 'required'}`}>{lable}</label>
            <textarea rows={row} type="text" className={`form-control ${!!errorT && 'is-invalid'}`} name={field} id={field}
                value={valueT || ''} onChange={(e) => handleChange(e)} maxLength={maxLength} />
            <div className="invalid-feedback">{errorT}</div>
        </div>

    );
}


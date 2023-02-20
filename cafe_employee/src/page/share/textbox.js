import React, { useState } from 'react';
import { MESSAGESERR } from '../../uitls/constant';
import { useEffect } from 'react';

export default function Textbox({
    lable, isRequired, field, value, error,
    onChange, minLength, maxLength }) {

    const [valueT, setValueT] = useState(value);
    const [errorT, setErrorT] = useState(error);

    useEffect(() => {
        setValueT(value)
    }, [value])

    useEffect(() => {
        setErrorT(error)
    }, [error])

    const handleChange = (e) => {
        handleValidation(e.target.value);
        setValueT(e.target.value);
        onChange(field, e.target.value, error);
    }

    const handleValidation = (value) => {
        let errMes = '';
        if (!value && isRequired)
            errMes = MESSAGESERR.field_required;

        if (minLength && minLength > value.length)
            errMes = `Minimum ${minLength} character.`;
        setErrorT(errMes);
    }

    return (
        <div className="col-lg-12 mb-3">
            <label htmlFor={field} className={`form-label ${isRequired && 'required'}`}>{lable}</label>
            <input type="text" className={`form-control ${!!errorT && 'is-invalid'}`} name={field} id={field}
                value={valueT || ''} onChange={(e) => handleChange(e)} maxLength={maxLength} />
            <div className="invalid-feedback">{errorT}</div>
        </div>
    );
}


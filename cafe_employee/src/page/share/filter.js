import React, { useState } from 'react';

export default function Filter({ placeholder, onSearch, onAdd }) {

    const [filter, setFilter] = useState('');

    return (
        <div className="row mt-5 mb-5">
            <div className="col-lg-6 mb-3">
                <input type="text" className="form-control form-control-lg" placeholder={`enter ${placeholder} to search`} value={filter} onChange={(e) => setFilter(e.target.value)} />
            </div>
            <div className="col-lg-3 mb-3 d-flex justify-content-end mb-3">
                <div className="btn-group" role="group">
                    <button className="btn btn-success " onClick={() => onSearch(filter)}><i className="fas fa-search"></i> Search</button>
                    <button className="btn btn-warning" onClick={onAdd} ><i className="fas fa-plus-circle"></i> Add New</button>
                </div>
            </div>
        </div>

    );
}


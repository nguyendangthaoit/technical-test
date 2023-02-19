// import {
//     LOAD_PRODUCT,
// } from '../constants/common';

const INIT_STATE =
{
    product: null
};

const EmployeeReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "":
            state = {
                ...state, product: action.product
            };
            return state

        default: return state;
    }
};

export default EmployeeReducer;

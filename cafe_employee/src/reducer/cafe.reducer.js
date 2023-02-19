
import { LOAD_CAFES_LOADING, LOAD_CAFES_SUCCESS, LOAD_CAFES_ERROR } from './../uitls/constant';


const initialState = {
    data: [],
    loading: false,
    error: ''
};

export default function CafeReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_CAFES_LOADING: {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
        case LOAD_CAFES_SUCCESS: {
            return {
                ...state,
                data: action.data,
                loading: false
            }
        }
        case LOAD_CAFES_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
}
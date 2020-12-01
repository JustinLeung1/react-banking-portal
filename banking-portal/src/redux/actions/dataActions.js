import axios from 'axios'
import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../types'


export const transfer = (transferData) => (dispatch) =>{
    dispatch({type:LOADING_UI});
    axios
    .post('/transfer', transferData)
    .then((res) => {
        dispatch({
            type:CLEAR_ERRORS,
            payload:res.data
        });
    })
    .catch((err) =>{
        console.log(err.response)
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    });
};
import axios from 'axios'
import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../types'


export const transfer = (transferData, history) => (dispatch) =>{
    dispatch({type:LOADING_UI});
    axios
    .post('/transfer', transferData)
    .then((res) => {
        dispatch({
            type:CLEAR_ERRORS,
            payload:res.data
        });
        history.push('/home');
    })
    .catch((err) =>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    });
};
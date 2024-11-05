
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading : false ,
    user : localStorage.getItem('user') ? localStorage.getItem('user') : null ,
    token : localStorage.getItem('token') ? localStorage.getItem('token') : null 
};

const authSlice = createSlice({
    name:"auth",
    initialState: initialState ,
    reducers: {
        setLoading ( state , value ){
            state.loading = value.payload ;
        },
        setUser ( state , value ) {
            state.user = value.payload ;
        },
        setToken ( state , value ) {
            state.user = value.payload ;
        }
    },
    
});

export const { setLoading , setUser , setToken } = authSlice.actions ;
export default authSlice.reducer ;
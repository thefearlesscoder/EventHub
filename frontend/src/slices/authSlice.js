
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading : false ,
    user : localStorage.getItem('user') ? localStorage.getItem('user') : null 
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
        }
    },
    
});

export const { setLoading , setUser } = authSlice.actions ;
export default authSlice.reducer ;
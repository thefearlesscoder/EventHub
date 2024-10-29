
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading : false ,
};

const authSlice = createSlice({
    name:"auth",
    initialState: initialState ,
    reducers: {
        setLoading ( state , value ){
            state.loading = value.payload ;
        }
    },
    
});

export const { setLoading } = authSlice.actions ;
export default authSlice.reducer ;
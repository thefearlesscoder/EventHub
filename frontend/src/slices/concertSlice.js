
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    location : "" ,
};

const concertSlice = createSlice({
    name:"concert",
    initialState: initialState ,
    reducers: {
        setLocation( state , value  ){
            state.location = value.payload ;
        }
    },
    
});

export const { setLocation } = concertSlice.actions ;
export default concertSlice.reducer ;
import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'counter',
  initialState:{
   alldata: "",
   weatherdata:[]
  },
  reducers: {
    setalldata: (state, action) => {
        state.alldata = action.payload
      },
    setweatherdata:(state, action) => {
        state.weatherdata = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setalldata,setweatherdata } = counterSlice.actions

export default counterSlice.reducer
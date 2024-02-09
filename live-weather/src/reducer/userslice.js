import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'counter',
  initialState:{
   alldata: ""
  },
  reducers: {
    setalldata: (state, action) => {
        state.alldata = action.payload
      }
  },
})

// Action creators are generated for each case reducer function
export const { setalldata} = counterSlice.actions

export default counterSlice.reducer
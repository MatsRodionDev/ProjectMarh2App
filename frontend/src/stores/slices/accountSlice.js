import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    account: null, 
  },
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    clearAccount: (state) => {
      state.account = null; 
    },
  },
});


export const { setAccount, clearAccount } = accountSlice.actions;

export default accountSlice.reducer;
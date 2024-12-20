import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    role: null,
    loading: false, 
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      state.loading = false; 
    },
    clearRole: (state) => {
      state.role = null; 
      state.loading = false; 
    },
    setLoading: (state, action) => {
      state.loading = action.payload; 
    },
  },
});

export const { setRole, clearRole, setLoading } = roleSlice.actions;

export default roleSlice.reducer;
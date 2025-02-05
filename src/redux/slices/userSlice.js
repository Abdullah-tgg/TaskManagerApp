import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },    updateUser: (state, action) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteUser: (state, action) => {
      const index = state.findIndex(user => user.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
      },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

const assignmentSlice = createSlice({
  name: 'assignments',
  initialState: [],  
  reducers: {
    assignUserToTask: (state, action) => {
      const { userId, taskId } = action.payload;
      if (!state.some(assignment => assignment.userId === userId && assignment.taskId === taskId)) {
        state.push({ userId, taskId });
      }
      else{
        Alert.alert("Already assigned")
      }
    },
    removeUserFromTask: (state, action) => {
      return state.filter(
        assignment => !(assignment.userId === action.payload.userId && assignment.taskId === action.payload.taskId)
      );
    },
  },
});

export const { assignUserToTask, removeUserFromTask } = assignmentSlice.actions;
export default assignmentSlice.reducer;

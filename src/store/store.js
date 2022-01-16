import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './membersSlice';

export default configureStore({
  reducer: {
    members: membersReducer,
  },
})
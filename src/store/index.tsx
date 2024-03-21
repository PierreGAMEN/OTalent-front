import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../store/reducer';
import searchReducer from './reducer/searchReducer';

const store = configureStore({
  reducer: {modal: modalReducer, searched: searchReducer}, devTools: true
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
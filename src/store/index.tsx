import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../store/reducer';
import searchReducer from './reducer/searchReducer';
import categoriesReducer from './reducer/categories';

const store = configureStore({
  reducer: {modal: modalReducer, searched: searchReducer, categories: categoriesReducer}, devTools: true
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
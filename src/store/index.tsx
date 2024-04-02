import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../store/reducer';

import categoriesReducer from './reducer/categories';
import tokenReducer from './reducer/tokenReducer';
import connexionReducer from './reducer/connexionReducer';

const store = configureStore({
  reducer: {modal: modalReducer, categories: categoriesReducer, token: tokenReducer, connexion: connexionReducer}, devTools: true
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
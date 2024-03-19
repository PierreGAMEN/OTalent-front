import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../store/reducer';

const store = configureStore({
  reducer: {modal: modalReducer}, devTools: true
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
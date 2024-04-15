import { createReducer } from '@reduxjs/toolkit';
import { getAuthentificationState } from '../actions/authentificationAction';

export const initialState = {
    isConnected: false,
};

const connectionReducer = createReducer(initialState, (builder) => {
    builder.addCase(getAuthentificationState, (state, action) => {
        state.isConnected = action.payload;
    });
});

export default connectionReducer;

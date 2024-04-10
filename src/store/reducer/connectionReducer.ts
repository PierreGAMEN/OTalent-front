import { createReducer } from '@reduxjs/toolkit';
import { getAuthentificationState } from '../actions/authentificationAction';

interface ConnectionState {
    isConnected?: boolean;
}
export const initialState: ConnectionState = {
    isConnected: false,
};

const connectionReducer = createReducer(initialState, builder => {
    builder.addCase(getAuthentificationState, (state, action) => {
        state.isConnected = action.payload;
    });
});

export default connectionReducer;

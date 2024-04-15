import { createReducer } from '@reduxjs/toolkit';

import { getstateModalForm } from '../actions/modalActions';

export const initialState = {
    state: false,
};

const modalReducer = createReducer(initialState, (builder) => {
    builder.addCase(getstateModalForm, (state, action) => {
        state.state = action.payload;
    });
});

export default modalReducer;

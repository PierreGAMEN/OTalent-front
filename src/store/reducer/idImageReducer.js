import { createReducer } from '@reduxjs/toolkit';
import { getImageUpload } from '../actions/getImageUpload';

export const initialState = {
    id: null,
};

const imageUploadId = createReducer(initialState, (builder) => {
    builder.addCase(getImageUpload, (state, action) => {
        state.id = action.payload;
    });
});

export default imageUploadId;

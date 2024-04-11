import { createReducer } from '@reduxjs/toolkit';
import { getAuthentificationState } from '../actions/authentificationAction';
import { getImageUpload } from '../actions/getImageUpload';

interface ImageUploadI {
    id?: string | number | null;
}
export const initialState: ImageUploadI = {
    id: null,
};

const imageUploadId = createReducer(initialState, builder => {
    builder.addCase(getImageUpload, (state, action) => {
        state.id = action.payload;
    });
});

export default imageUploadId;

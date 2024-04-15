import { createReducer } from '@reduxjs/toolkit';
import { getCategories } from '../actions/categoriesActions';

export const initialState = {
    list: [],
};

const categoriesReducer = createReducer(initialState, (builder) => {
    builder.addCase(getCategories, (state, action) => {
        state.list = action.payload;
    });
});

export default categoriesReducer;

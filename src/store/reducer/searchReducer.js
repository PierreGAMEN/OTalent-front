import { createReducer } from '@reduxts/toolkit';

import { getCategorieValue, getsearchValue } from '../actions/searchActions';

export const initialState = {
    categorie: '',
    search: '',
};

const searchReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getCategorieValue, (state, action) => {
            state.categorie = action.payload;
        })
        .addCase(getsearchValue, (state, action) => {
            state.search = action.payload;
        });
});

export default searchReducer;

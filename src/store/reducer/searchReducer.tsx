import { createReducer } from "@reduxjs/toolkit";

import {  getCategorieValue, getSearchValue } from "../actions/searchActions";

interface SearchProps {
  categorie?: string;
  search?: string;
}
export const initialState: SearchProps = {
    categorie: '',
    search: ''
};

const searchReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCategorieValue, (state, action) => {
    state.categorie = action.payload;
  }).addCase(getSearchValue, (state, action) => {
    state.search = action.payload;
  })
});

export default searchReducer;
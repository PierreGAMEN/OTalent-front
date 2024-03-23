import { createReducer } from "@reduxjs/toolkit";

import {  getCategories } from "../actions/categoriesActions";

interface categories {
  list: []
}
export const initialState: categories = {
    list: []
};

const categoriesReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCategories, (state, action) => {
    state.list = action.payload;
  });
});

export default categoriesReducer;
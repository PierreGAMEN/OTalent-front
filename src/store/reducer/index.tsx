import { createReducer } from "@reduxjs/toolkit";

import {  getValue } from "../actions";

interface RecipesState {
  list: [];
}
export const initialState: RecipesState = {
  list: [],
};

const formReducer = createReducer(initialState, (builder) => {
  builder.addCase(getValue, (state, action) => {
    state.list = action.payload;
  });
});

export default formReducer;
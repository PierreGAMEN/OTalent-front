import { createReducer } from "@reduxjs/toolkit";

import {  getStateModalForm } from "../actions";

interface RecipesState {
  state?: boolean;
}
export const initialState: RecipesState = {
  state: false,
};

const modalReducer = createReducer(initialState, (builder) => {
  builder.addCase(getStateModalForm, (state, action) => {
    state.state = action.payload;
  });
});

export default modalReducer;
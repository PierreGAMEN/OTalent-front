import { createReducer } from "@reduxjs/toolkit";

import {  getStateModalForm } from "../actions/modalActions";

interface ModalState {
  state?: boolean;
}
export const initialState: ModalState = {
  state: false,
};

const modalReducer = createReducer(initialState, (builder) => {
  builder.addCase(getStateModalForm, (state, action) => {
    state.state = action.payload;
  });
});

export default modalReducer;
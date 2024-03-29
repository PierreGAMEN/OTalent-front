import { createReducer } from "@reduxjs/toolkit";
import { getAuthentificationState } from "../actions/authentificationAction";


interface ConnexionState {
  isConnected?: boolean;
}
export const initialState: ConnexionState = {
    isConnected: false,
};

const connexionReducer = createReducer(initialState, (builder) => {
  builder.addCase(getAuthentificationState, (state, action) => {
    state.isConnected = action.payload;
  });
});

export default connexionReducer;
import { createReducer } from "@reduxjs/toolkit";
import { getStateModalEditTraining } from "../actions/modalEditTrainingAction";


interface editInformationState {
  isOpen?: boolean;
  trainingId?: string | number | null
}
export const initialState: editInformationState = {
    isOpen: false,
    trainingId: null
};

const modalEditInformationReducer = createReducer(initialState, (builder) => {
  builder.addCase(getStateModalEditTraining, (state, action) => {
    const payload = action.payload; 
      state.isOpen = payload.isOpen;
      state.trainingId = payload.trainingId;

  });
});

export default modalEditInformationReducer;
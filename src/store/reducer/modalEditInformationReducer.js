import { createReducer } from '@reduxjs/toolkit';
import { getstateModalEditTraining } from '../actions/modalEditTrainingAction';

export const initialState = {
    isOpen: false,
    trainingId: null,
};

const modalEditInformationReducer = createReducer(initialState, (builder) => {
    builder.addCase(getstateModalEditTraining, (state, action) => {
        const payload = action.payload;
        state.isOpen = payload.isOpen;
        state.trainingId = payload.trainingId;
    });
});

export default modalEditInformationReducer;

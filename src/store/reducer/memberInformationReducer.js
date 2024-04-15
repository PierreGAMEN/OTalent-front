import { createReducer } from '@reduxjs/toolkit';
import { getMemberInformationActions } from '../actions/getUserInformation';
import { useAppSelector } from '../redux-hook/hook';

export const initialState = {
    userInformation: {
        firstname: '',
        lastname: '',
        avatar: '',
    },
};

const memberInformationReducer = createReducer(initialState, (builder) => {
    builder.addCase(getMemberInformationActions, (state, action) => {
        const { firstname, lastname, avatar } = action.payload;
        state.userInformation = { firstname, lastname, avatar };
    });
});

export default memberInformationReducer;

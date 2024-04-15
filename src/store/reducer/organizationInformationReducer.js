import { createReducer } from '@reduxjs/toolkit';
import { getOrganizationInformationActions } from '../actions/getUserInformation';

export const initialState = {
    userInformation: {
        name: '',
        image: '',
    },
};

const organizationInformationReducer = createReducer(
    initialState,
    (builder) => {
        builder.addCase(getOrganizationInformationActions, (state, action) => {
            const { name, image } = action.payload;
            state.userInformation = { name, image };
        });
    }
);

export default organizationInformationReducer;

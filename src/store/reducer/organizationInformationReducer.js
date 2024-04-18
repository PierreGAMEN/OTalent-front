import { createReducer } from '@reduxjs/toolkit';
import { getOrganizationInformationActions } from '../actions/getUserInformation';

export const initialState = {
    userInformation: {
        name: '',
        image: '',
        id:''
    },
};

const organizationInformationReducer = createReducer(
    initialState,
    (builder) => {
        builder.addCase(getOrganizationInformationActions, (state, action) => {
            const { name, image, id } = action.payload;
            state.userInformation = { name, image, id };
        });
    }
);

export default organizationInformationReducer;

import { createReducer } from '@reduxjs/toolkit';
import { getTokenInformation } from '../actions/tokenActions';

export const initialState = {
    user: {
        id: null,
        member: null,
        iat: null,
    },
};

const tokenReducer = createReducer(initialState, (builder) => {
    builder.addCase(getTokenInformation, (state, action) => {
        const { member, id, iat } = action.payload;
        state.user = { member, id, iat };
    });
});

export default tokenReducer;

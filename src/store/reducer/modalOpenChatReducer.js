import { createReducer } from '@reduxjs/toolkit';
import { openModalChat } from '../actions/modalChatAction';

export const initialState = {
    isOpen: false,
};

const modalOpenChatReducer = createReducer(initialState, (builder) => {
    builder.addCase(openModalChat, (state, action) => {
        state.isOpen = action.payload;
    });
});

export default modalOpenChatReducer;

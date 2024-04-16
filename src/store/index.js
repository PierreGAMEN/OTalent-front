import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducer';

import categoriesReducer from './reducer/categories';
import tokenReducer from './reducer/tokenReducer';
import connectionReducer from './reducer/connectionReducer';
import modalEditInformationReducer from './reducer/modalEditInformationReducer';
import imageUploadId from './reducer/idImageReducer';
import memberInformationReducer from './reducer/memberInformationReducer';
import organizationInformationReducer from './reducer/organizationInformationReducer';
import modalOpenChatReducer from './reducer/modalOpenChatReducer';

const store = configureStore({
    reducer: {
        modal: modalReducer,
        categories: categoriesReducer,
        token: tokenReducer,
        connection: connectionReducer,
        editTraining: modalEditInformationReducer,
        idImage: imageUploadId,
        memberInformation: memberInformationReducer,
        organizationInformation: organizationInformationReducer,
        chat: modalOpenChatReducer
    },
    devTools: true,
});

export default store;


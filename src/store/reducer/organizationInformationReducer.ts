import { createReducer } from "@reduxjs/toolkit";
import {getOrganizationInformationActions } from "../actions/getUserInformation";

interface userInformationI {
  name?: string;
  image?: string | number | null
}
interface userProps {
    userInformation: userInformationI;
  }
  
  export const initialState: userProps = {
    userInformation: {
        name: "",
        image: "",
    },
  };

const organizationInformationReducer = createReducer(initialState, (builder) => {
    builder.addCase(getOrganizationInformationActions, (state, action) => {
      const { name, image } = action.payload as unknown as userInformationI;
      state.userInformation = { name, image };
    });
  });

export default organizationInformationReducer;
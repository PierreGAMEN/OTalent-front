import { createReducer } from "@reduxjs/toolkit";
import { getMemberInformationActions } from "../actions/getUserInformation";
import { useAppSelector } from "../redux-hook/hook";



interface userInformationI {
  firstname?: string;
  lastname?: string | number | null
  avatar?: string
}
interface userProps {
    userInformation: userInformationI;
  }
  
  export const initialState: userProps = {
    userInformation: {
        firstname: "",
        lastname: "",
        avatar: "" 
    },
  };

const memberInformationReducer = createReducer(initialState, (builder) => {
    builder.addCase(getMemberInformationActions, (state, action) => {
      const { firstname, lastname, avatar } = action.payload as unknown as userInformationI;
      state.userInformation = { firstname, lastname, avatar };
    });
  });

export default memberInformationReducer;
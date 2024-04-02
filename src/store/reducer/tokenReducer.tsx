import { createReducer } from "@reduxjs/toolkit";
import { getTokenInformation } from "../actions/tokenActions";

interface UserData {
  id: string | number | null;
  member: boolean | null;
  iat: number | null;
}

interface SearchProps {
  user: UserData;
}

export const initialState: SearchProps = {
  user: {
    id: null,
    member: null,
    iat: null 
  },
};

const tokenReducer = createReducer(initialState, (builder) => {
  builder.addCase(getTokenInformation, (state, action) => {
    const { member, id, iat } = action.payload as unknown as UserData;
    state.user = { member, id, iat };
  });
});

export default tokenReducer;

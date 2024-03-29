import { createAction } from "@reduxjs/toolkit";

export const getAuthentificationState = createAction<boolean>("getAuthentificationState");
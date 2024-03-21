import { createAction } from "@reduxjs/toolkit";

export const getCategorieValue = createAction<string>("getCategorieValue");
export const getSearchValue = createAction<string>("getSearchValue");
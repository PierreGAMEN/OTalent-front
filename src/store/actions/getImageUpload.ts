import { createAction } from "@reduxjs/toolkit";

export const getImageUpload = createAction<string | number | null>("getImageUpload");

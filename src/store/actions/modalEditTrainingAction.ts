import { createAction } from "@reduxjs/toolkit";

export const getStateModalEditTraining = createAction<{ isOpen: boolean; trainingId: string | number | null; }>("getStateModalEditTraining");

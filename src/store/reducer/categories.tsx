import { createReducer } from "@reduxjs/toolkit";
import { getCategories } from "../actions/categoriesActions";

interface Category {
  id: string;
  label: string;

}

interface CategoriesState {
  list: Category[]; 
}

export const initialState: CategoriesState = {
  list: []
};

// Créer le réducteur des catégories
const categoriesReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCategories, (state, action) => {
    state.list = action.payload; // Assumer que payload est de type Category[]
  });
});

export default categoriesReducer;

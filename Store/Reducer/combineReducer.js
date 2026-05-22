import { combineReducers } from "@reduxjs/toolkit";
import notes from "../Slices/notesSlice";
export const rootReducer = combineReducers({
  savedNotes: notes,
});

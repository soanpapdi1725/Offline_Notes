import { createSlice } from "@reduxjs/toolkit";

const notesInitialState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState: notesInitialState,
  reducers: {
    createNotes: (state, action) => {
      state.notes.push(action.payload);
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export const { createNotes, setNotes } = notesSlice.actions;
export default notesSlice.reducer;

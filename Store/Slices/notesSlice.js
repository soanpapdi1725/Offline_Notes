import { createSlice } from "@reduxjs/toolkit";

const notesInitialState = {
  notes: [
    {
      id: 1,
      title: "Complete React Native UI",
      description:
        "Finish the home screen UI and add responsive task cards using NativeWind.",
      category: "Work",
      completed: false,
      createdAt: "2026-05-20",
      dueDate: "2026-05-25",
    },

    {
      id: 2,
      title: "Buy Groceries",
      description:
        "Purchase milk, bread, vegetables, fruits, and snacks for the week.",
      category: "Personal",
      completed: true,
      createdAt: "2026-05-18",
      dueDate: "2026-05-22",
    },

    {
      id: 3,
      title: "Prepare DBMS Notes",
      description:
        "Revise normalization, joins, indexing, and transactions for exams.",
      category: "Study",
      completed: false,
      createdAt: "2026-05-19",
      dueDate: "2026-05-27",
    },

    {
      id: 4,
      title: "Workout Session",
      description:
        "Complete 45 minutes of strength training and stretching exercises.",
      category: "Health",
      completed: true,
      createdAt: "2026-05-17",
      dueDate: "2026-05-23",
    },

    {
      id: 5,
      title: "Read Atomic Habits",
      description:
        "Read two chapters and write important productivity takeaways.",
      category: "Self Growth",
      completed: false,
      createdAt: "2026-05-15",
      dueDate: "2026-05-30",
    },

    {
      id: 6,
      title: "Team Meeting",
      description:
        "Discuss project deadlines, API integration, and deployment updates.",
      category: "Work",
      completed: true,
      createdAt: "2026-05-21",
      dueDate: "2026-05-22",
    },

    {
      id: 7,
      title: "Meditation Practice",
      description:
        "Practice mindfulness meditation for 20 minutes before sleeping.",
      category: "Health",
      completed: false,
      createdAt: "2026-05-14",
      dueDate: "2026-05-24",
    },

    {
      id: 8,
      title: "Watch React Native Tutorial",
      description: "Learn advanced navigation and animations in React Native.",
      category: "Learning",
      completed: false,
      createdAt: "2026-05-13",
      dueDate: "2026-05-28",
    },

    {
      id: 9,
      title: "Clean Workspace",
      description:
        "Organize desk setup, remove unnecessary items, and clean cables.",
      category: "Personal",
      completed: true,
      createdAt: "2026-05-16",
      dueDate: "2026-05-21",
    },

    {
      id: 10,
      title: "Update Portfolio",
      description:
        "Add latest React Native and MERN stack projects to portfolio website.",
      category: "Career",
      completed: false,
      createdAt: "2026-05-20",
      dueDate: "2026-05-29",
    },
  ],
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

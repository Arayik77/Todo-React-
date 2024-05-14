import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface People {
  id: string;
  text: string;
  completed: boolean;
}

const initialState: People[] = [];

export const people = createSlice({
  name: "people",
  initialState,
  reducers: {
    nextPeople: {
      reducer: (state, action: PayloadAction<People>) => {
        state.push(action.payload);
      },
      prepare: (text: string) => ({
        payload: {
          id: new Date().toISOString(),
          text,
          completed: false,
        },
      }),
    },
  },
});

export const { nextPeople } = people.actions;

export default people.reducer;
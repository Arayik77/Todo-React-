import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Planet {
  id: string;
  text: string;
  completed: boolean;
}

const initialState: Planet[] = [];

export const Planet = createSlice({
  name: "planet",
  initialState,
  reducers: {
    nextPlanet: {
      reducer: (state, action: PayloadAction<Planet>) => {
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

export const { nextPlanet } = Planet.actions;

export default Planet.reducer;
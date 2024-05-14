import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import peoplesReducer from "./features/people/people";
import planetReducer from "./features/planet/planet";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    peoples: peoplesReducer,
    planets: planetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
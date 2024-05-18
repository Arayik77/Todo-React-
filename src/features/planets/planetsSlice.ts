import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface PlanetState {
    planets: unknown[];
    page: number;
    searchQuery: string;
    totalPages: number;
    loading: boolean;
    error: string | null;
}

const initialState: PlanetState = {
    planets: [],
    page: 1,
    searchQuery: '',
    totalPages: 1,
    loading: false,
    error: null,
};

const fetchPlanets = createAsyncThunk(
    "planets/fetchPlanets",
    async ({page, searchQuery} : { page: number, searchQuery: string}) => {
      const response = await axios.get(
        `https://swapi.dev/api/planets/?page=${page}&search=${searchQuery}`
      );
  
      return response.data;
    }
  );
  
  const planetSlice = createSlice({
    name: "planets",
    initialState,
    reducers: {
      setPage(state, action) {
        state.page = action.payload;
      },
      setSearchQuery(state, action) {
        state.searchQuery = action.payload;
        state.page = 1;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchPlanets.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(fetchPlanets.fulfilled, (state, action) => {
        state.loading = false;
        state.planets = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 10);
      });
  
      builder.addCase(fetchPlanets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch planets";
      });
    },
  });
  
  export const { setPage, setSearchQuery } = planetSlice.actions;
  export { fetchPlanets };
  
  export default planetSlice.reducer;
  
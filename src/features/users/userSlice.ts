import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  users: unknown[];
  page: number;
  search: string | null;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  page: 1,
  search: '',
  totalPages: 1,
  loading: false,
  error: null,
};

const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number) => {
    const response = await axios.get(
      `https://swapi.dev/api/people/?page=${page}`
    );

    return response.data;
  }
);

const setSearch = createAsyncThunk(
  "users/search",
  async (search: string) => {
    const response = await axios.get(
      `https://swapi.dev/api/people/?search=${search}`
    );

    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    //
    
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.results;
      state.totalPages = Math.ceil(action.payload.count / 10);
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch users";
    });

    // search for users

    builder.addCase(setSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.results;
      state.totalPages = Math.ceil(action.payload.count / 10);
    });

    builder.addCase(setSearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch users";
    });
  },
});

export const { setPage } = userSlice.actions;
export { setSearch };
export { fetchUsers };

export default userSlice.reducer;

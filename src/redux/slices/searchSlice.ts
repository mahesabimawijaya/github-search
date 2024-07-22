import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RepositoryType, UserType } from "../../types/UserRepo";

interface SearchState {
  data: UserType[] | RepositoryType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalResults: number;
  totalPages: number;
}

const GITHUB_TOKEN = import.meta.env.VITE_REACT_APP_GITHUB_TOKEN;

const initialState: SearchState = {
  data: [],
  status: "idle",
  error: null,
  totalResults: 0,
  totalPages: 0,
};

export const fetchResults = createAsyncThunk("search/fetchResults", async ({ query, type, page }: { query: string; type: string; page: number }) => {
  try {
    const searchResponse = await axios.get(`https://api.github.com/search/${type}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
      params: {
        q: query,
        page,
        per_page: 9,
      },
    });

    const items = searchResponse.data.items;

    if (type === "users") {
      const userPromises = items.map((user: { url: string }) => axios.get(user.url));
      const users = await Promise.all(userPromises);
      const userData = users.map((userResponse) => userResponse.data);

      return {
        items: userData,
        total_count: searchResponse.data.total_count,
      };
    } else {
      return {
        items,
        total_count: searchResponse.data.total_count,
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.items;
        state.totalResults = action.payload.total_count;
        state.totalPages = Math.ceil(action.payload.total_count / 9);
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch results";
      });
  },
});

export default searchSlice.reducer;

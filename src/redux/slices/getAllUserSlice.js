import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL; // Remove await

// Fetch all users action
export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",
  async (_, { rejectWithValue }) => { // Correct the thunk function parameters
    try {
      const result = await axios.get(`${REACT_APP_BASE_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error); 
      return rejectWithValue(error.response.data); 
    }
  }
);

const allUserSlice = createSlice({
  name: "allUsers",
  initialState: {
    isLoading: false,
    isError: false,
    users: [],
    errorMessage: '',
    successMessage: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users = action.payload.users;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || 'Failed to fetch users';
      });
  }
});

export default allUserSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch all users action
export const addScore = createAsyncThunk(
  "score/addScore",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.put(`${REACT_APP_BASE_URL}/addscore/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add score');
    }
  }
);

const addScoreSlice = createSlice({
  name: "addScore",
  initialState: {
    isLoading: false,
    isError: false,
    totalScore: 0,
    addedScore: 0,
    errorMessage: '',
    successMessage: ''
  },
  reducers: {
    setScore : (state) => {
        state.addedScore = 0
        state.totalScore = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addScore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addScore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.totalScore = action.payload.points || state.totalScore; 
        state.addedScore = action.payload.pointsAdded || state.addedScore;
      })
      .addCase(addScore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || 'Failed to add score';
      });
  }
});
export const { setScore } = addScoreSlice.actions
export default addScoreSlice.reducer;

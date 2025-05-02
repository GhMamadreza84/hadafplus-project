import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDomains = createAsyncThunk(
  "domains/fetchDomains",
  async () => {
    const response = await fetch(
      "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch domains");
    }
    return response.json();
  }
);

const domainSlice = createSlice({
  name: "domains",
  initialState: {
    domains: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDomains.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDomains.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.domains = action.payload;
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default domainSlice.reducer;

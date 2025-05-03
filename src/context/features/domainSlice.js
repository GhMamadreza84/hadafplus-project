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


export const updateDomain = createAsyncThunk(
  "domains/updateDomain",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update domain");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteDomain = createAsyncThunk(
  "domains/deleteDomain",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete domain");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
      })
      
      .addCase(updateDomain.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDomain.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedDomain = action.payload;
        const index = state.domains.findIndex((d) => d.id === updatedDomain.id);
        if (index !== -1) {
          state.domains[index] = updatedDomain;
        }
      })
      .addCase(updateDomain.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteDomain.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDomain.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.domains = state.domains.filter((d) => d.id !== action.payload);
      })
      .addCase(deleteDomain.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default domainSlice.reducer;

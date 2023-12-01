import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventResponse, eventService } from "./eventService";

interface EventState {
  event: null | {
    name: string;
    description: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventState = {
  event: null,
  status: "idle",
  error: null,
};

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (details: {
    name: string;
    description: string;
    token: string;
  }): Promise<EventResponse> => {
    const response = await eventService.createEvent(
      details.name,
      details.description,
      details.token
    );

    return response;
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createEvent.fulfilled,
        (state, action: PayloadAction<EventResponse>) => {
          state.status = "succeeded";
          state.event = {
            name: action.payload.name,
            description: action.payload.description,
          };
        }
      ).addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Event creation failed";
      })
  },
});

export default eventSlice.reducer;

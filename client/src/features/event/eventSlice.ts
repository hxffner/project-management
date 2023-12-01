import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventResponse, eventService } from "./eventService";

interface EventState {
  event: null | {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
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
    startDate: Date;
    endDate: Date;
    token: string;
  }): Promise<EventResponse> => {
    const response = await eventService.createEvent(
      details.name,
      details.description,
      details.startDate,
      details.endDate,
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
            startDate: action.payload.startDate,
            endDate: action.payload.endDate,
          };
        }
      )
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Event creation failed";
      });
  },
});

export default eventSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
  email: "",
  events: [],
  accessRole: "",
  token: null,
};

export const Auth = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    authHandler: (state, action) => {
      return {
        ...state,
        role: action.payload.role,
        email: action.payload.email,
        accessRole: action.payload.accessRole,
        token: action.payload.token,
        events: action.payload.events,
      };
    },
    createMeetingflagHandler: (state, action) => {
      return {
        ...state,
        createMeetingflag: ![state.createMeetingflag],
      };
    },
  },
});

export const { authHandler, createMeetingflagHandler } = Auth.actions;

export default Auth.reducer;

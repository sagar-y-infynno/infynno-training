import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import carsReducer from '../reducers/carsSlice';

const makeStore = () => configureStore({
  reducer: {
    cars: carsReducer
  }
});

export const wrapper = createWrapper(makeStore);

import { RootState } from "./store";

export const appSelector = (state: RootState) => state.app;
export const postSelector = (state: RootState) => state.post;
export const categorySelector = (state: RootState) => state.category;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer from './reducers/todoReducer';

export const store = configureStore({
  reducer: {
    //@ts-ignore
    todo: todoReducer
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

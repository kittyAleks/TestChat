import {configureStore, ThunkDispatch, UnknownAction} from '@reduxjs/toolkit';

// reducers
import commentsReducer from '../../store/comment/commentsSlice.ts';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export type AppDispatch = ReturnType<typeof store.dispatch>;
export const useDispatch: () => AppDispatch &
  ThunkDispatch<RootState, void, UnknownAction> = useReduxDispatch;

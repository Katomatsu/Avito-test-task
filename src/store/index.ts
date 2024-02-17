import { configureStore } from '@reduxjs/toolkit';
import storyReducer from './slices/storiesSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import commentsReducer from './slices/commentsSlice';
export const store = configureStore({
	reducer: {
    stories: storyReducer,
    comments: commentsReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
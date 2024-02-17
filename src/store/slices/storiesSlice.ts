import { createSlice } from '@reduxjs/toolkit/react';
import { AppDispatch } from '..';
import { StoryModel } from '../../models/StoryModel';
import { fetchData } from '../../utils/fetchData';

interface StorySliceState {
	stories: StoryModel[];
	story: StoryModel | null;
	error: string | undefined;
}

const initialState: StorySliceState = {
	stories: [],
	story: null,
	error: undefined
};

const storySlice = createSlice({
	name: 'stories',
	initialState,
	reducers: {
		getStories: (state, action) => {
			state.stories = [...action.payload];
		},
		clearStories: state => {
			state.stories = [];
		},
		getStory: (state, action) => {
			state.story = action.payload;
		},
		createStoriesError: (state, action) => {
			state.error = action.payload;
		}
	}
});

export const getStories = (signal: AbortSignal) => {
	return async (dispatch: AppDispatch) => {
		dispatch(storyActions.createStoriesError(undefined));

		const stories: number[] | string = await fetchData(
			'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
			signal
		);

		if (Array.isArray(stories)) {
			const limitedStoriesIds = stories.slice(0, 100);

			const fetchedStories: StoryModel[] = await Promise.all(
				limitedStoriesIds.map(async commentId => {
					const commentsItem = await fetchData(
						`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`,
						signal
					);
					return commentsItem;
				})
			);
			dispatch(storySlice.actions.getStories(fetchedStories));
		} else {
			dispatch(storySlice.actions.createStoriesError(stories));
		}
	};
};

export const getStory = (storyId: number, signal?: AbortSignal) => {
	return async (dispatch: AppDispatch) => {
		dispatch(storyActions.createStoriesError(undefined));
		const story: StoryModel | string = await fetchData(
			`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`,
			signal
		);
		if (typeof story === 'string') {
			dispatch(storyActions.createStoriesError(story));
		}

		dispatch(storySlice.actions.getStory(story));
	};
};

export const storyActions = storySlice.actions;

export default storySlice.reducer;

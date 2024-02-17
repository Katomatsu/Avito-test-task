import { createSlice } from '@reduxjs/toolkit/react';
import { CommentsModel } from '../../models/CommentsModel';
import { AppDispatch } from '..';
import { fetchData } from '../../utils/fetchData';

interface CommentsSliceState {
	comments: CommentsModel[];
}

const initialState: CommentsSliceState = {
	comments: []
};

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		getComments: (state, action) => {
			if (state.comments.length > 0) {
				action.payload.forEach((updatedItem: CommentsModel) => {
					const index = state.comments.findIndex(
						comment => comment.id === updatedItem.id
					);
					if (index !== -1) {
						state.comments[index] = updatedItem;
					} else {
						state.comments.push(updatedItem);
					}
				});
			} else {
				state.comments = action.payload;
			}
		},
		clearComments: state => {
			state.comments = [];
		}
	}
});

export const getComments = (ids: number[], signal?: AbortSignal) => {
	return async (dispatch: AppDispatch) => {
		const fetchedCommets: CommentsModel[] | string = await Promise.all(
			ids.map(async commentId => {
				const commentsItem = await fetchData(
					`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`,
					signal
				);
				return commentsItem;
			})
		);
    if (Array.isArray(fetchedCommets)) {

      const finalComments = fetchedCommets.filter(
        item => item && !item.deleted && !item.dead
      );
      dispatch(commentsSlice.actions.getComments(finalComments));
    }
	};
};

export const commentsActions = commentsSlice.actions;

export default commentsSlice.reducer;

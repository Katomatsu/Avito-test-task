import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { commentsActions, getComments } from '../../store/slices/commentsSlice';
import CommentItem from './CommentItem';
import Spinner from '../spinner/Spinner';

interface CommentsProps {
	commentsIds: number[];
	parentId: number;
}

const CommentsList = ({ commentsIds, parentId }: CommentsProps) => {
	const comments = useAppSelector(state => state.comments.comments);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		dispatch(getComments(commentsIds, signal));
		return () => {
			dispatch(commentsActions.clearComments());
			controller.abort();
		};
	}, [dispatch, commentsIds]);

	return (
		<div className='border-[2px] mx-auto p-5 sm:w-[90%] w-[100%] bg-main mt-10'>
			{comments.length === 0 && <Spinner color='#000000'/>}
			{comments.map(comment => {
				return (
					comment.parent === parentId && (
						<CommentItem
							display='block'
							by={comment.by}
							text={comment.text}
							key={comment.id}
							parentId={comment.id}
							kids={comment.kids}
						/>
					)
				);
			})}
		</div>
	);
};

export default CommentsList;

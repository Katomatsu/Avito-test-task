import { useEffect, useState } from 'react';
import { verticalLine } from '../../styles';
import ToggleArrow from '../../UI/ToggleArrow';
import { useAppDispatch, useAppSelector } from '../../store';
import { getComments } from '../../store/slices/commentsSlice';

interface CommentscommentProps {
	kids: number[];
	by: string;
	text: string;
	parentId: number;
	display: 'block' | 'hidden';
}

const CommentItem = ({
	kids,
	by,
	text,
	parentId,
	display
}: CommentscommentProps) => {
	const comments = useAppSelector(state => state.comments.comments);
	const dispatch = useAppDispatch();
	const parentCommentIndex =
		comments && comments.findIndex(item => item && item.id === parentId);

	const [isNestedStates, setIsNestedStates] = useState<{
		[key: number]: boolean;
	}>({});

	const handleArrowClick = (id: number) => {
		setIsNestedStates(prevStates => {
			return {
				...prevStates,
				[id]: !prevStates[id]
			};
		});
	};

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		if (kids) {
			dispatch(getComments(kids, signal));
		}

		return () => {
			controller.abort();
		};
	}, [kids, dispatch]);

	const content = (
		<>
			<div
				className={`bg-main mb-8 text-left break-words ml-3 relative  ${
					display === 'hidden' ? 'hidden' : 'block'
				}`}
			>
				<ToggleArrow
					expandComments={() => handleArrowClick(parentId)}
					isNestedState={isNestedStates[parentId] || false}
				/>
				<div className={`${verticalLine}`} />

				<div className='mt-3 break-words pl-5'>
					Written by: {by} <br />
					{text} <br />
				</div>

				{comments[parentCommentIndex].kids &&
					comments.map(comment => {
						return (
							comment.parent === parentId && (
								<CommentItem
									display={
										isNestedStates[parentId]
											? 'block'
											: 'hidden'
									}
									by={comment.by}
									text={comment.text}
									parentId={comment.id}
									key={comment.id}
									kids={comment.kids}
								/>
							)
						);
					})}

				{isNestedStates[parentId] &&
					!comments[parentCommentIndex].kids && (
						<h3 className='pl-5 text-[25px]'>No comments here</h3>
					)}
			</div>
		</>
	);

	return content;
};

export default CommentItem;

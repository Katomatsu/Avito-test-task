import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { getStory } from '../../store/slices/storiesSlice';
import { useEffect, useState } from 'react';
import CommentsList from '../comments/CommentsList';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ReloadButton from '../../UI/ReloadButton';

const StoryDetails = () => {
	const { story, error } = useAppSelector(state => state.stories);
	const comments = useAppSelector(state => state.comments.comments);
	const dispatch = useAppDispatch();
	const { storyId } = useParams();
	const [isReload, setIsReload] = useState<boolean>(false);
  const navigate = useNavigate()
	const reloadHandler = () => {
		setIsReload(prev => !prev);
	};

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		if (storyId && isNaN(parseInt(storyId))) {
      navigate('/error')
		} else if (storyId) {
			dispatch(getStory(+storyId, signal));
		}
		const interval = setInterval(() => {
			reloadHandler();
		}, 60000);

		return () => {
			clearInterval(interval);
			controller.abort();
		};
	}, [dispatch, storyId, isReload, navigate]);
	let content: JSX.Element;

	if (!story) {
		content = <Spinner color='#3f9cd6' />;
	} else {
		const publicDate = new Date(story.time * 1000).toLocaleString();
		content = (
			<>
				<nav className='flex justify-center items-center mb-5'>
					<Link to='/news' className='block mr-10'>
						<ReloadButton>&#8592; Back to stories</ReloadButton>
					</Link>
					<ReloadButton action={reloadHandler}>
						Reload the comments
					</ReloadButton>
				</nav>
				{error && <ErrorMessage errorMessage={error} />}
				{!error && (
					<>
						<div className='border-[2px] p-5 sm:w-[90%] w-[100%] mx-auto bg-main'>
							<h2>{story.title}</h2>
							<h4>
								<a href={story.url} className='text-[#8180f3]'>
									Link To Story
								</a>
							</h4>
							<p>{comments.length} comments</p>
							<p>Date of post: {publicDate}</p>
							<p>Posted by: {story.by}</p>
						</div>

						{story.kids ? (
							<CommentsList
								parentId={story.id}
								commentsIds={story.kids}
							/>
						) : (
							<h2 className='text-white mt-5 border-[4px] py-5 sm:w-[90%] w-[100%] mx-auto'>
								There is no comments
							</h2>
						)}
					</>
				)}
			</>
		);
	}

	return <div className='text-black'>{content}</div>;
};

export default StoryDetails;

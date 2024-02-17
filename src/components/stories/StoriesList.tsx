// import loadingIndicator from '../../assets/270-ring.svg';

import StoryItem from './StoryItem';

import { useAppDispatch, useAppSelector } from '../../store';
import { useEffect, useState } from 'react';
import { storyActions, getStories } from '../../store/slices/storiesSlice';
import ReloadButton from '../../UI/ReloadButton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const StoriesList = () => {
	const [isReload, setIsReload] = useState<boolean>(false);
	const { stories, error } = useAppSelector(state => state.stories);
	const dispatch = useAppDispatch();

	const reloadHandler = () => {
		setIsReload(prev => !prev);
	};

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		dispatch(getStories(signal));
		const interval = setInterval(() => {
			reloadHandler();
		}, 60000);

		return () => {
			controller.abort();
			dispatch(storyActions.clearStories());
			clearInterval(interval);
		};
	}, [dispatch, isReload]);

	return (
		<>
			{error && (
				<>
					<ReloadButton action={reloadHandler}>
						Reload the stories
					</ReloadButton>
					<ErrorMessage errorMessage={error} />
				</>
			)}

			{!error && stories.length === 0 && (
				<div className='flex justify-center'>
					<Spinner color='#3f9cd6' />
				</div>
			)}

			{!error && stories.length > 0 && (
				<>
					<ReloadButton action={reloadHandler}>
						Reload the stories
					</ReloadButton>

					<ul className=' mx-auto sm:w-[90%] w-[100%] mt-5'>
						{stories.map((item, index) => {
							return (
								<StoryItem
									by={item.by}
									order={index}
									kids={item.kids}
									title={item.title}
									key={item.id}
									id={item.id}
									score={item.score}
									url={item.url}
									date={item.time}
								/>
							);
						})}
					</ul>
				</>
			)}
		</>
	);
};

export default StoriesList;

import { Link } from 'react-router-dom';

interface NewsItemProps {
	title: string;
	by: string;
	score: number;
	kids?: number[];
	url: string;
	date: number;
	id: number;
  order: number
}

const StoryItem = ({ title, date, by, score, kids, id, order }: NewsItemProps) => {
	const publicDate = new Date().getTime() - new Date(date * 1000).getTime();
	const minutesDifference = Math.floor(publicDate / (1000 * 60));
	const hoursDifference = Math.floor(publicDate / (1000 * 60 * 60));
	const daysDifference = Math.floor(publicDate / (1000 * 60 * 60 * 24));
	return (
		<li className='bg-main py-2 text-left pl-10 flex'>
			<p className='text-[#828282] mr-1 font-bold'>{order + 1}.</p>
			<div>
				<h4 className='text-black'>
					<Link to={`${id}`} className='font-medium'>
						{title}
					</Link>
				</h4>
				<p className='text-[#828282]'>
					{`${score} points | by ${by} | ${
						daysDifference > 0
							? daysDifference > 1
								? `${daysDifference} days`
								: `${daysDifference} day`
							: hoursDifference > 0
							? hoursDifference > 1
								? `${hoursDifference} hours `
								: `${hoursDifference} hour`
							: minutesDifference > 1
							? `${minutesDifference} minutes`
							: `${minutesDifference} minute`
					}  ago | ${kids ? kids.length : 0} root comments`}
				</p>
			</div>
		</li>
	);
};

export default StoryItem;

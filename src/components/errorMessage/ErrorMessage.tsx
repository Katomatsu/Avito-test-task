import img from '../../assets/error.gif';

interface ErrorMessageProps {
	errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
	return (
		<>
			<img
        className='block w-[250px] h-[250px] object-contain mx-auto mt-5'
				src={img}
				alt='error'
			/>
			<div>
				<h1 className='text-xl text-black'>Error</h1>
				<p className='text-lg text-black'>
					Sorry, something went wrong:
				</p>
				<p className='text-lg text-red-600'>{errorMessage}</p>
				{errorMessage !== 'Page Not Found' && (
					<p className='text-lg text-black'>
						Check your network. Try to reload the page. If it
						doesn't work, please try again later.
					</p>
				)}
			</div>
		</>
	);
};

export default ErrorMessage;

interface ReloadButtonProps {
	action?: () => void;
  children: string | JSX.Element
}

const ReloadButton = ({ action, children }: ReloadButtonProps) => {
	return (
		<button
			onClick={action}
			className='w-[200px] h-[50px] bg-[#ff6600] text-black border-none rounded-xl shadow-[5px_-2px_10px] shadow-red-950 '
			type='button'
		>
			{children}
		</button>
	);
};

export default ReloadButton;

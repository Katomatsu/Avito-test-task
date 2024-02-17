import { arrowDown, arrowRight } from '../styles';

interface ToggleArrowProps {
	expandComments: () => void;
	isNestedState: boolean;
}

const ToggleArrow = ({ expandComments, isNestedState }: ToggleArrowProps) => {
	return (
		<div
			className={`${!isNestedState ? arrowRight : arrowDown}`}
			onClick={expandComments}
		/>
	);
};

export default ToggleArrow;

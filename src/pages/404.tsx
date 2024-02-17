import { Link } from 'react-router-dom';
import ErrorMessage from '../components/errorMessage/ErrorMessage'
import ReloadButton from '../UI/ReloadButton';

const ErrorPage = () => {
  return (
		<div>
			<Link to='/' className='block mb-5'>
				<ReloadButton>&#8592; Back to stories</ReloadButton>
			</Link>
			<ErrorMessage errorMessage='Page Not Found' />
		</div>
  );
}

export default ErrorPage
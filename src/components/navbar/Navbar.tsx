import { Link } from "react-router-dom";
import ReloadButton from "../../UI/ReloadButton";

interface NavbarProps {
  reloadHandler: () => void
}

const Navbar = ({reloadHandler}: NavbarProps) => {
  return (
		<nav className='flex justify-center items-center mb-5'>
			<Link to='/Avito-test-task' className='block mr-10'>
				<ReloadButton>&#8592; Back to stories</ReloadButton>
			</Link>
			<ReloadButton action={reloadHandler}>
				Reload the comments
			</ReloadButton>
		</nav>
  );
}

export default Navbar
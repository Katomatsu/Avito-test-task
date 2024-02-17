import './App.css';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailsPage from './pages/DetailsPage';
import ErrorPage from './pages/404';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Navigate to='/news' />
		},
		{
			path: '/news',
			element: <MainPage />
		},
		{
			path: '/news/:storyId',
			element: <DetailsPage />
		},
		{
			path: '*',
			element: <ErrorPage/>
		}
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;

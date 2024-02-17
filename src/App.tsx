import './App.css';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailsPage from './pages/DetailsPage';
import ErrorPage from './pages/404';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <MainPage />
		},
		{
			path: '/:storyId',
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

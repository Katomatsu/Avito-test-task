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
			path: '/Avito-test-task',
			element: <MainPage />
		},
		{
			path: 'Avito-test-task/:storyId',
			element: <DetailsPage />
		},
		{
			path: '*',
			element: <ErrorPage />
		}
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;

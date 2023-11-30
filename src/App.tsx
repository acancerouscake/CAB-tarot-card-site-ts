import Home from './components/Home/Home';
import NoMatch from './components/NoMatch';
import About from './components/About';
import Cards from './components/Cards/Cards';
import History from './components/History';

import './App.css';
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext';
import ProtectedLayout from './components/ProtectedLayout';
import {TarotCardContextProvider} from './contexts/TarotCardContext';
import Login from './components/Login';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error404 from './pages/Error404';
import NavWrapper from './components/NavigationBar/NavWrapper';

function App() {
	const router = createBrowserRouter([
		{
			element: (
				<AuthContextProvider>
					<Outlet />
				</AuthContextProvider>
			),

			children: [
				{
					element: (
						<NavWrapper>
							<ToastContainer style={{}} limit={1} />
							<Outlet />
						</NavWrapper>
					),
					children: [
						{
							path: '/',
							element: <Home />,
							errorElement: <NoMatch />,
						},
						{
							path: '/cards',
							element: (
								<TarotCardContextProvider>
									<Cards />
								</TarotCardContextProvider>
							),
						},

						{
							path: '/about',
							element: <About />,
						},
						{
							path: '/login',
							element: <Login />,
						},

						{
							path: '/history',
							element: (
								<ProtectedLayout>
									<History />
								</ProtectedLayout>
							),
						},
					],
				},
				{
					path: '*',
					element: <Error404 />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;

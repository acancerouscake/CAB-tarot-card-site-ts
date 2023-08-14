import Home from "./components/Home/Home";
import NoMatch from "./components/NoMatch";
import About from "./components/About";
import Cards from "./components/Cards/Cards";
import History from "./components/History";

import "./App.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import {AuthContextProvider} from "./contexts/AuthContext";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ProtectedLayout from "./components/ProtectedLayout";
import {TarotCardContextProvider} from "./contexts/TarotCardContext";
import Login from "./components/Login";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={
					<div style={{zIndex: 30}}>
						<NavigationBar />
					</div>
				}
				errorElement={<NoMatch />}
			>
				<Route index element={<Home />} />
				<Route
					path="cards"
					element={
						<TarotCardContextProvider>
							<Cards />
						</TarotCardContextProvider>
					}
				/>
				<Route path="about" element={<About />} />
				<Route path="login" element={<Login />} />

				<Route
					path="history"
					element={
						<ProtectedLayout>
							<History />
						</ProtectedLayout>
					}
				/>
			</Route>
		)
	);

	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	);
}

export default App;

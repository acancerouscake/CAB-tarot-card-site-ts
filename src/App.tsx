import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import About from "./components/About";
import Cards from "./components/Cards";
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

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<NavigationBar />} errorElement={<NoMatch />}>
				<Route index element={<Home />} />
				<Route path="cards" element={<Cards />} />
				<Route path="about" element={<About />} />
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

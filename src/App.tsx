import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import About from "./components/About";
import Cards from "./components/Cards";
import History from "./components/History";

import "./App.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Link,
	NavLink,
	Outlet,
	Route,
	Router,
	RouterProvider,
} from "react-router-dom";
import {AuthContext, AuthContextProvider} from "./contexts/AuthContext";
import {useContext} from "react";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />} errorElement={<NoMatch />}>
				<Route index element={<Home />} />
				<Route path="cards" element={<Cards />} />
				<Route path="about" element={<About />} />
				<Route path="history" element={<History />} />
			</Route>
		)
	);

	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	);
}

const Root = () => {
	const {user, login, logout} = useContext(AuthContext);

	return (
		<div>
			<nav
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
					flexDirection: "row",
					width: "100vw",
					backgroundColor: " #f7eedb",
					height: "50px",
				}}
			>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/cards">Tarot Reading</NavLink>
				<NavLink
					to="/about"
					style={({isActive}) => {
						return isActive
							? {borderBottom: "1px solid black"}
							: {borderBottom: ""};
					}}
				>
					About
				</NavLink>

				<NavLink to="/history">
					{({isActive}) => {
						return isActive ? "history" : "not-in-history";
					}}
				</NavLink>

				{user ? (
					<button onClick={logout}>Logout</button>
				) : (
					<button onClick={login}>Login</button>
				)}
			</nav>

			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default App;

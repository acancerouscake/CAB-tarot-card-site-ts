import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import About from "./components/About";
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

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Root />} errorElement={<NoMatch />}>
				<Route index element={<Home />} />
				{/* <Route path="history" element={<SeasonsLayout />} /> */}
				<Route path="about" element={<About />} />
			</Route>
		)
	);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

const Root = () => {
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
				{/* | <Link to="/tarot">Tarot</Link>| */}
				<NavLink
					to="/about"
					style={({isActive}) => {
						return isActive
							? {textDecoration: "underline"}
							: {textDecoration: "none"};
					}}
				>
					About
				</NavLink>

				{/* <NavLink to="/history">
					{({isActive}) => {
						return isActive ? "history" : "not-in-history";
					}}
				</NavLink> */}
			</nav>

			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default App;

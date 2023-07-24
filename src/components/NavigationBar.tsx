import {useContext} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";

function NavigationBar() {
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
}

export default NavigationBar;

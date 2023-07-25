import {useContext} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import "./navStyles.css";

function NavigationBar() {
	const {user, login, logout} = useContext(AuthContext);

	return (
		<>
			<input type="checkbox" className="toggler"></input>
			<div className="hamburger">
				<div></div>
			</div>
			<div className="menu">
				<nav
					style={
						{
							// display: "flex",
							// justifyContent: "space-evenly",
							// alignItems: "center",
							// flexDirection: "row",
							// width: "100vw",
							// backgroundColor: " #f7eedb",
							// height: "50px",
						}
					}
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
							return isActive ? "History" : "not-in-history";
						}}
					</NavLink>
					{
						//TODO: Turn this into a component for login and logout
					}
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
		</>
	);
}

export default NavigationBar;

import {useContext} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import "./navStyles.css";

function NavigationBar() {
	const {user, login, logout} = useContext(AuthContext);
	return (
		<>
			<input type="checkbox" className="toggler"></input>
			<div className={"hamburger"}>
				<div className="dataContainer"></div>
			</div>
			<div className="menu">
				<nav>
					<NavLink
						to="/"
						style={({isActive}) => {
							return isActive ? {color: "orange "} : {color: ""};
						}}
					>
						Home
					</NavLink>
					<NavLink
						to="/cards"
						style={({isActive}) => {
							return isActive ? {color: "orange "} : {color: ""};
						}}
					>
						Tarot Reading
					</NavLink>
					<NavLink
						to="/about"
						style={({isActive}) => {
							return isActive ? {color: "orange "} : {color: ""};
						}}
					>
						About
					</NavLink>

					<NavLink
						to="/history"
						style={({isActive}) => {
							return isActive ? {color: "orange "} : {color: ""};
						}}
					>
						History
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

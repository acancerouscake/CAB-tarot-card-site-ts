import {useContext, useState} from "react";
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

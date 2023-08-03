import {useContext} from "react";
import {NavLink, Outlet} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import styles from "./navStyles.module.css";

//TODO: Make it so the checkbox value is a useState update the open close value of the menu based on the state rather than relying on css

function NavigationBar() {
	const {user, logout} = useContext(AuthContext);
	return (
		<>
			<input
				type="checkbox"
				className={styles.toggler}
				id="checkboxToggler"
			></input>
			<div className={styles.hamburger}>
				<div className={styles.dataContainer}></div>
			</div>
			<div
				className={styles.menu}
				// onClick={() => {
				// 	const toggler = document.getElementById("checkboxToggler");
				// 	toggler?.removeAttribute("checked");

				// 	console.log(toggler);
				// }}
			>
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

					{user ? (
						<button
							className={"button-5"}
							style={{marginTop: 20}}
							onClick={logout}
						>
							Logout
						</button>
					) : (
						<NavLink to="/login">Login</NavLink>
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
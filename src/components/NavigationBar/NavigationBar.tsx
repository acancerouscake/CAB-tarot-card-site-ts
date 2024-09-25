import {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext';
import styles from './navStyles.module.css';
import {TarotCardContextProvider} from '../../contexts/TarotCardContext';

//TODO: Make it so the checkbox value is a useState update the open close value of the menu based on the state rather than relying on css

function NavigationBar() {
	const {user, logout} = useContext(AuthContext);
	return (
		<>
			<input type="checkbox" className={styles.toggler} id="checkboxToggler"></input>
			<div className={styles.hamburger}>
				<div className={styles.dataContainer} style={{overflow: 'hidden'}}></div>
			</div>
			<div className={styles.menu}>
				<nav>
					<div className={styles.navLinksContainer}>
						<NavLink to="/" style={({isActive}) => ({color: isActive ? 'orange' : ''})}>
							Home
						</NavLink>
						<TarotCardContextProvider>
							<NavLink to="/cards" style={({isActive}) => ({color: isActive ? 'orange' : ''})}>
								Tarot Reading
							</NavLink>
						</TarotCardContextProvider>
						<NavLink to="/about" style={({isActive}) => ({color: isActive ? 'orange' : ''})}>
							About
						</NavLink>
						{user && (
							<NavLink to="/history" style={({isActive}) => ({color: isActive ? 'orange' : ''})}>
								History
							</NavLink>
						)}
					</div>
					<div className={styles.logoutContainer}>
						{user ? (
							<button className={'button-5'} onClick={logout}>
								Logout
							</button>
						) : (
							<NavLink to="/login">Login</NavLink>
						)}
					</div>
				</nav>
			</div>
		</>
	);
}

export default NavigationBar;

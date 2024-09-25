import {FormEvent, createContext, useEffect, useState} from 'react';
import {type User, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebaseConfig';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

export interface ContextType {
	user: User | null;
	handleLogin: (e: FormEvent<HTMLFormElement>, email: string, password: string) => void;
	logout: () => void;
	handleRegister: (e: FormEvent<HTMLFormElement>, email: string, password: string) => void;
	isChecked: boolean;
}

const defaultValue: ContextType = {
	user: null,
	handleLogin: () => {
		throw Error('No provider');
	},
	logout: () => {
		throw Error('No provider');
	},
	handleRegister: () => {
		throw Error('No provider');
	},
	isChecked: false,
};

export const AuthContext = createContext(defaultValue);

interface Props {
	children: React.ReactNode;
}

export const AuthContextProvider = (props: Props) => {
	//TODO: Add toasts to login and  auto redirect after login

	const [user, setUser] = useState<User | null>(null);
	const [isChecked, setIsChecked] = useState(false);
	const redirect = useNavigate();

	const logout = () => {
		signOut(auth)
			.then(() => {
				toast.success(`Logout successful, Bye ${user?.displayName as string}, redirecting...`);
				setUser(null);
				toast.clearWaitingQueue();
				setTimeout(() => redirect('/login'), 2000);
			})
			.catch((error) => {
				console.log(error);
				toast.error(`${error as string}`);
				toast.clearWaitingQueue();
			});
	};

	const handleRegister = (e: FormEvent<HTMLFormElement>, email: string, password: string) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('new user', user);
				setUser(user);
				setTimeout(() => redirect('/'), 2000);
				toast.success(`Signup Successful, Hi ${user.displayName as string}, logging in... `);
				toast.clearWaitingQueue();
			})
			.catch((error) => {
				toast.error(`Something went wrong - ${error as string}`);
				toast.clearWaitingQueue();
			});
	};

	const handleLogin = (e: FormEvent<HTMLFormElement>, email: string, password: string) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user);
				toast.success(`Login Successful,  Hi ${user.displayName as string},`);
				toast.clearWaitingQueue();
				setTimeout(() => redirect('/'), 2000);
			})
			.catch((error) => {
				toast.error(`${error as string}`);
				toast.clearWaitingQueue();
			});
	};

	const checkActiveUser = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				toast.success(`User is already logged in...`);
				toast.clearWaitingQueue();
			} else {
				setUser(null);
				toast.error(`User not logged in`);
				toast.clearWaitingQueue();
			}
			setIsChecked(true);
		});
	};

	useEffect(() => {
		checkActiveUser();
	}, []);

	return <AuthContext.Provider value={{user, handleLogin, logout, handleRegister, isChecked}}>{props.children}</AuthContext.Provider>;
};

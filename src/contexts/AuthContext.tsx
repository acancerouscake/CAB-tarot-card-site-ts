import {FormEvent, createContext, useEffect, useState} from "react";
import {CardResponse, CardType, CardsJSON} from "../types/types";
import {
	type User,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	signInWithEmailAndPassword,
} from "firebase/auth";
import * as TarotImages from "../json/tarot-images.json";
import {auth} from "../firebaseConfig";

export interface ContextType {
	user: User | null | "No provider";
	handleLogin: (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => void;
	logout: () => void;
	handleRegister: (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => void;
	isChecked: boolean;
}

const defaultValue: ContextType = {
	user: "No provider",
	handleLogin: () => {
		throw Error("No provider");
	},
	logout: () => {
		throw Error("No provider");
	},
	handleRegister: () => {
		throw Error("No provider");
	},
	isChecked: false,
};

export const AuthContext = createContext(defaultValue);

interface Props {
	children: React.ReactNode;
}

export const AuthContextProvider = (props: Props) => {
	// const {cards} = TarotImages as CardsJSON;
	const [user, setUser] = useState<User | null>(null);
	const [isChecked, setIsChecked] = useState(false);

	const logout = () => {
		signOut(auth)
			.then(() => {
				setUser(null);
			})
			.catch((error) => {
				// An error happened.
				console.log(error);
			});
	};

	const handleRegister = (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log("new user", user);
				setUser(user);
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				console.log(error);
			});
	};

	const handleLogin = (
		e: FormEvent<HTMLFormElement>,
		email: string,
		password: string
	) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setUser(user);
				// ...
			})
			.catch((error) => {
				// const errorCode = error.code;
				// const errorMessage = error.message;
				console.log(error);
			});
	};

	const checkActiveUser = () => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				const uid = user.uid;
				setUser(user);
				// ...
			} else {
				setUser(null);
				// User is signed out
				// ...
			}
			setIsChecked(true);
		});
	};

	useEffect(() => {
		checkActiveUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{user, handleLogin, logout, handleRegister, isChecked}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

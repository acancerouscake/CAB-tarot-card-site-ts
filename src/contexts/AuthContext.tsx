import {createContext, useState} from "react";
import {User} from "../types/types";

export interface ContextType {
	user: User | "No provider";
	login: () => void;
	logout: () => void;
}

const defaultValue: ContextType = {
	user: "No provider",
	login: () => {
		throw Error("No provider");
	},
	logout: () => {
		throw Error("No provider");
	},
};

export const AuthContext = createContext(defaultValue);

interface Props {
	children: React.ReactNode;
}

export const AuthContextProvider = (props: Props) => {
	const [user, setUser] = useState(false);

	const login = () => {
		setUser(true);
	};

	const logout = () => {
		setUser(false);
	};

	return (
		<AuthContext.Provider value={{user, login, logout}}>
			{props.children}
		</AuthContext.Provider>
	);
};

import React, {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";

type Props = {
	children: React.ReactNode;
};

function ProtectedLayout({children}: Props) {
	console.log(children);
	const {user} = useContext(AuthContext);
	return (
		<>
			{user ? (
				children
			) : (
				<p>Restricted content. Please log in to access {children}</p>
			)}
		</>
	);
}

export default ProtectedLayout;

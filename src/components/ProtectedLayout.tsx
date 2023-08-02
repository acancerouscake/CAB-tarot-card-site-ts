import React, {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";

type Props = {
	children: React.ReactNode;
};

function ProtectedLayout({children}: Props) {
	const {user, isChecked} = useContext(AuthContext);
	return isChecked ? (
		user ? (
			<div
				style={{
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "center",
					flexDirection: "column",
					width: "100vw",
					height: "30vh",
				}}
			>
				{children}
			</div>
		) : (
			<>
				<p
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						width: "100vw",
						height: "30vh",
					}}
				>
					Restricted content. Please log in to access
				</p>
				{children}
			</>
		)
	) : (
		<>
			<p
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					width: "100vw",
					height: "30vh",
				}}
			>
				Restricted content. Please log in to access
			</p>
			{children}
		</>
	);
}

export default ProtectedLayout;

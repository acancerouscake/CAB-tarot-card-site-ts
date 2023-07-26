import React from "react";
// import { Button } from "react-bootstrap";
import {Link, Navigate, useNavigate, useRouteError} from "react-router-dom";

interface RouteErrorType {
	data: string;
	error: {
		message: string;
		stack: string;
	};
	internal: boolean;
	status: number;
	statusText: string;
}

function NoMatch() {
	const error = useRouteError() as RouteErrorType;
	console.log("error :>> ", error);
	const goHome = useNavigate();

	const clickHome = () => {
		// goHome("/");
		// goHome("/", { replace: true });
		goHome("/", {replace: true});
	};
	return (
		<div>
			<h1>...Nothing to see here...</h1>
			<h3>{error.statusText}</h3>
			<h3>{error.error.message}</h3>
			{/* //? UX using link */}
			<Link to="/">...go back to Home...</Link>

			<button onClick={clickHome}>Click to go Home</button>

			<Navigate to="/" />
		</div>
	);
}

export default NoMatch;

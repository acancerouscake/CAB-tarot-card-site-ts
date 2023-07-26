import React from "react";
import {useLocation} from "react-router-dom";

const History = () => {
	const location = useLocation();
	console.log("location :>> ", location);
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				height: "50vh",
				width: "100vw",
			}}
		>
			<h1>History</h1>
		</div>
	);
};

export default History;

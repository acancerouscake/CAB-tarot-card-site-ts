import React from "react";
import {useLocation} from "react-router-dom";

const History = () => {
	const location = useLocation();
	console.log("location :>> ", location);
	return (
		<div>
			<h1>History</h1>
		</div>
	);
};

export default History;

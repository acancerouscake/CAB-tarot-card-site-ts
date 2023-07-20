import React from "react";
import {useLocation} from "react-router-dom";

const About = () => {
	const location = useLocation();
	console.log("location :>> ", location);
	return (
		<div>
			<h1>About</h1>
		</div>
	);
};

export default About;

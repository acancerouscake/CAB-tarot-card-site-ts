import {useContext} from "react";
import AuthForm from "../components/AuthForm";
import {AuthContext} from "../contexts/AuthContext";

const Login = () => {
	const {handleRegister, handleLogin} = useContext(AuthContext);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-evenly",
				alignItems: "center",
				width: "100vw",
				height: "70vh",
			}}
		>
			<AuthForm title={"Login"} handleSubmit={handleLogin} />
			<AuthForm title={"Register"} handleSubmit={handleRegister} />
		</div>
	);
};

export default Login;

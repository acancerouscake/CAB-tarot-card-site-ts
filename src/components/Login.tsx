import {useState, useContext} from 'react';
import AuthForm from '../components/AuthForm';
import {AuthContext} from '../contexts/AuthContext';

const Login = () => {
	const {handleRegister, handleLogin} = useContext(AuthContext);
	// State to toggle between login and register
	const [isLoginMode, setIsLoginMode] = useState(true);

	return (
		<div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100vw', height: '70vh'}}>
			<div className={'loginDiv'} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
				{isLoginMode ? (
					<>
						<AuthForm title={'Login'} handleSubmit={handleLogin} />
						<p>Don't have an account?</p>
						<a onClick={() => setIsLoginMode(false)}>Register here</a>
					</>
				) : (
					<>
						<AuthForm title={'Register'} handleSubmit={handleRegister} />
						<p>Already have an account?</p>
						<a onClick={() => setIsLoginMode(true)}>Login here</a>
					</>
				)}
			</div>
		</div>
	);
};

export default Login;

import React from 'react';

interface SpinnerProps {
	size?: number;
	color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({size = 50, color = '#52b7b5'}) => {
	return (
		<div
			style={{
				width: `${size}px`,
				height: `${size}px`,
				borderColor: color,
				borderTopColor: 'transparent',
				borderWidth: '5px',
				borderStyle: 'solid',
				borderRadius: '50%',
				animation: 'spin 1s linear infinite',
			}}
		/>
	);
};

export default Spinner;

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
				border: `8px solid ${color}`,
				borderTop: `8px solid transparent`,
				borderRadius: '50%',
				animation: 'spin 1s linear infinite',
			}}
		/>
	);
};

const spinnerKeyframes = `
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
`;

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(spinnerKeyframes, styleSheet.cssRules.length);

export default Spinner;

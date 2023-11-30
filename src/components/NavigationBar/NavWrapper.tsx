import NavigationBar from './NavigationBar';

type Props = {
	children: React.ReactNode;
};

const navWrapperStyles: React.CSSProperties = {
	height: '100vh',
	width: '100vw',
	position: 'sticky',
	display: 'flex',
	flexDirection: 'row',
	zIndex: 30,
};

const NavWrapper = (props: Props) => {
	return (
		<div style={navWrapperStyles}>
			<NavigationBar />
			{props.children}
		</div>
	);
};

export default NavWrapper;

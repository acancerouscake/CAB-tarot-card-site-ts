import "../assets/css/spinner.css";

export default function LoadingSpinner() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				textAlign: "center",
				height: "100%",
			}}
		>
			<h3>Loading Tarot Deck...</h3>
			<div className="loading-spinner"></div>
		</div>
	);
}

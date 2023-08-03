import "../assets/css/spinner.css";
import {Player, Controls} from "@lottiefiles/react-lottie-player";

export default function LoadingSpinner() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				justifyContent: "space-around",
				textAlign: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "50vw",
					maxWidth: "400px",
				}}
			>
				<Player
					autoplay
					loop
					src="src/assets/lotties/spin-lottie.json"
					style={{borderRadius: "50%"}}
				>
					<Controls visible={false} buttons={["play", "repeat"]} />
				</Player>
			</div>
			<div>
				<h3>Loading Tarot Deck...</h3>
			</div>
		</div>
	);
}

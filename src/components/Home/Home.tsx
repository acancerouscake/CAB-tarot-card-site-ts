import {NavLink} from "react-router-dom";
import backgroundVideo from "../../assets/vids/backgroundVid.mp4";
import styles from "./homeStyles.module.css";
export default function Home() {
	//TODO: Make video fit home screen properly
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "center",
					flexDirection: "column",
					width: "100vw",
				}}
			>
				<h1>Mystic Tarot </h1>

				<p>Welcome to your online medium!</p>
			</div>
			<div
				style={{
					position: "absolute",
					top: 0,
					zIndex: -50,
					height: "100%",
					width: "100vw ",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<video
					autoPlay
					loop
					muted
					id="video"
					style={{
						objectFit: "cover",
						height: "100% ",
						width: "100%",
					}}
				>
					<source src={backgroundVideo} type="video/mp4" />
				</video>
			</div>

			<div className={styles.wrapper}>
				<div className={styles.link_wrapper}>
					<NavLink to="/cards">Get A Reading</NavLink>

					<div className={styles.icon}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 268.832 268.832"
						>
							<path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
						</svg>
					</div>
				</div>
			</div>
		</>
	);
}

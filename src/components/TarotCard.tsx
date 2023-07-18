import {CardType} from "../types/types";

interface TarotCardProps {
	card: CardType;
}

const TarotCard = ({card}: TarotCardProps) => {
	const {name, type, meaning_up, meaning_rev, img} = card;

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				textAlign: "center",
				border: "1px solid white",
				padding: "10px",
				width: "25vw",
				minWidth: "200px",
				height: "400px",
				color: " black",
				backgroundColor: "white",
			}}
		>
			<img src={img} style={{width: "150px"}} title={name}></img>
			<p>{type}</p>
			<p style={{fontSize: "1.2vmin"}}>{meaning_up}</p>
		</div>
	);
};
export default TarotCard;

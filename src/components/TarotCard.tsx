import {CardType} from "../types/types";

interface TarotCardProps {
	card: CardType;
}

const TarotCard = ({card}: TarotCardProps) => {
	const {name, type, meaning_up, img} = card;

	return (
		<div>
			<img src={img} style={{width: "100px"}} title={name}></img>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
					flexDirection: "row",
					textAlign: "center",
					width: "100%",
					zIndex: "1",
				}}
			>
				<p style={{fontSize: "14px"}}>{name}</p>
				<p style={{fontSize: "14px"}}>{type}</p>
			</div>
			{
				//fixes scaling text issue in fontSize
			}
			<p style={{fontSize: "min(.8vmax, 10px)"}}>{meaning_up}</p>
		</div>
	);
};
export default TarotCard;

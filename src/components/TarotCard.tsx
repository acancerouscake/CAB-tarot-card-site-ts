import {CardType} from "../types/types";

interface TarotCardProps {
	card: CardType;
}

const TarotCard = ({card}: TarotCardProps) => {
	const {name, type, meaning_up, meaning_rev} = card;

	return (
		<div>
			<p>{name}</p>
			<p>{type}</p>
			<p>{meaning_up}</p>
			<p> {meaning_rev}</p>
		</div>
	);
};
export default TarotCard;

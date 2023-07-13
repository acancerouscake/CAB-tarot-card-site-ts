import React, {useEffect, useState} from "react";
import {Card, CardResponse} from "../types/types";

export default function Home() {
	const [numberOfCards, setNumberOfCards] = useState(1);
	const [tarotCards, setTarotCards] = useState<Card[]>([
		{
			type: "",
			name_short: "",
			name: "",
			value: "",
			value_int: 0,
			meaning_up: "",
			meaning_rev: "",
			desc: "",
			suit: "",
		},
	]);

	const fetchCards = async (noOfCards: number) => {
		const response = await fetch(
			`https://tarot-api-3hv5.onrender.com/api/v1/cards/random?n=5`
		);
		const data = (await response.json()) as CardResponse;
		setTarotCards(data.cards);
	};

	const handleButtonClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const buttonVal = (e.target as HTMLButtonElement).value;
		if (buttonVal === "3") {
			setNumberOfCards(parseInt(buttonVal));
			console.log(numberOfCards);
		}
	};

	useEffect(() => {
		fetchCards(numberOfCards).catch((error) => {
			// console.log("error :>> ", error);
		});
	}, [numberOfCards]);

	return (
		<div>
			<h1>Home</h1>
			<button onClick={handleButtonClick} name="Three Cards" value={"3"}>
				Three Cards
			</button>

			{tarotCards &&
				tarotCards.map((card) => {
					return (
						<div key={card.value_int} style={{border: "1px white solid"}}>
							<p>{card.desc}</p>
							<p>{card.name}</p>
							<p>{card.type}</p>
							<p>{card.meaning_up}</p>
							<p> {card.meaning_rev}</p>
						</div>
					);
				})}
		</div>
	);
}

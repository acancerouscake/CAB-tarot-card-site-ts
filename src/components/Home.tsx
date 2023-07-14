import React, {useEffect, useState} from "react";
import {Card, CardResponse} from "../types/types";

export default function Home() {
	const cardSpreadVals = ["3", "6", "10", "12"];
	const [numberOfCards, setNumberOfCards] = useState<number>();
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
		if (noOfCards) {
			try {
				const response = await fetch(
					`https://tarot-api-3hv5.onrender.com/api/v1/cards/random?n=${noOfCards}`
				);
				const data = (await response.json()) as CardResponse;
				setTarotCards(data.cards);
			} catch (e) {
				console.log("error :>> ", e);
			}
		}
		return;
	};

	const handleButtonClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const buttonVal = (e.target as HTMLButtonElement).value;
		setNumberOfCards(parseInt(buttonVal));
	};

	useEffect(() => {
		numberOfCards &&
			fetchCards(numberOfCards).catch((e) => {
				console.log(e);
			});
	}, [numberOfCards]);

	return (
		<div>
			<h1>Home</h1>
			{cardSpreadVals.map((spreadVal) => {
				return (
					<button
						onClick={handleButtonClick}
						name={`${spreadVal} Cards`}
						value={spreadVal}
					>
                        { `${ spreadVal }` } Cards
					</button>
				);
			})}

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

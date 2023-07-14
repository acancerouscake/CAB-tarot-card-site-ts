import React, {useEffect, useState} from "react";
import {Card, CardResponse} from "../types/types";

export default function Home() {
	const cardSpreadVals = ["3", "6", "10", "12"];
	const [numberOfCards, setNumberOfCards] = useState<number>();
	const [tarotCards, setTarotCards] = useState<Card[]>([]);

	const fetchCards = async (noOfCards: number) => {
		setTarotCards([]);
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
		setNumberOfCards(0);
		setNumberOfCards(parseInt(buttonVal));
	};

	useEffect(() => {
		numberOfCards &&
			fetchCards(numberOfCards).catch((e) => {
				console.log(e);
			});
	}, [numberOfCards]);

	console.log(tarotCards);

	return (
		<div>
			<h1>Home</h1>
			{cardSpreadVals.map((spreadVal) => {
				return (
					<button
						onClick={handleButtonClick}
						name={`${spreadVal} Cards`}
						value={spreadVal}
						key={spreadVal}
					>
						{`${spreadVal}`} Cards
					</button>
				);
			})}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexWrap: "wrap",
				}}
			>
				{tarotCards.length >= 3 ? (
					tarotCards.map((card) => {
						return (
							<div
								key={card.value_int}
								style={{
									border: "1px white solid",
									height: "450px",
									width: "300px",
								}}
								title={card.desc}
							>
								<p>{card.name}</p>
								<p>{card.type}</p>
								<p>{card.meaning_up}</p>
								<p> {card.meaning_rev}</p>
							</div>
						);
					})
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

import React, {useEffect, useState} from "react";
import {CardType, CardResponse, CardJSONImageType, CardsJSON} from "../types/types";
import TarotCard from "./TarotCard";
import Loading from "./Loading";
import * as TarotImages from "../json/tarot-images.json";

//TODO: Make fetch(78cards) work, retrieve cards based on number from button click

export default function Home() {
	const cardSpreadVals = ["3", "6", "10", "12"];
	const [numberOfCards, setNumberOfCards] = useState<number>();
	const [tarotCards, setTarotCards] = useState<CardType[]>([]);
	const [dealtCards, setDealtCards] = useState<CardType[]>([]);
	const [loading, setIsLoading] = useState<boolean>(false);
	const {cards} = TarotImages as CardsJSON;

	const getImagesForCards = (apiCardData: CardType[]) => {
		apiCardData.forEach((cardAPI) => {
			cards.forEach((cardJSON) => {
				if (cardAPI.name === cardJSON.name) {
					return (cardAPI.img = cardJSON.img);
				}
			});
		});
		randomizeCards(apiCardData);
	};

	const randomizeCards = (cards: CardType[]) => {
		for (let i = cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[cards[i], cards[j]] = [cards[j], cards[i]];
		}
		setTarotCards(cards);
	};

	const fetchCards = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`https://tarot-api-3hv5.onrender.com/api/v1/`);
			const data = (await response.json()) as CardResponse;
			getImagesForCards(data.cards);
			setIsLoading(false);
		} catch (e) {
			console.log("error :>> ", e);
			setIsLoading(false);
		}
	};

	const dealCards = (noOfCards: number) => {
		setDealtCards([]);
		setNumberOfCards(0);
		const tmpArr: CardType[] = [];
		for (let i = 0; i < noOfCards; i++) {
			tmpArr.push(tarotCards[i]);
		}
		setDealtCards(tmpArr);
	};

	const handleButtonClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const buttonVal = (e.target as HTMLButtonElement).value;
		setNumberOfCards(parseInt(buttonVal));
	};

	useEffect(() => {
		fetchCards().catch((e) => {
			console.log("e :>> ", e);
		});

		if (numberOfCards && numberOfCards > 0) {
			dealCards(numberOfCards);
		}
	}, [numberOfCards]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<h1>Mystic Tarot </h1>
			<div
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
					flexDirection: "row",
					width: "50vw",
					height: "10vh",
				}}
			>
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
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexWrap: "wrap",
				}}
			>
				{loading ? (
					<Loading />
				) : (
					dealtCards.map((card, idx) => {
						return (
							<div key={idx}>
								<TarotCard card={card} />
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}

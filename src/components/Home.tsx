import React, {useEffect, useState} from "react";
import {CardType, CardResponse, CardsJSON} from "../types/types";
import TarotCard from "./TarotCard";
import Loading from "./Loading";
import * as TarotImages from "../json/tarot-images.json";

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
		setIsLoading(false);
	};

	const fetchCards = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`https://tarot-api-3hv5.onrender.com/api/v1/`);
			const data = (await response.json()) as CardResponse;
			getImagesForCards(data.cards);
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
				justifyContent: "flex-start",
				alignItems: "center",
				flexDirection: "column",
				width: "100vw",
			}}
		>
			<h1>Mystic Tarot </h1>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					width: "100vw",
				}}
			>
				{loading ? (
					<Loading />
				) : (
					<div
						style={{
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-evenly",
								alignItems: "center",
								flexDirection: "row",
								width: "50vw",
								height: "15vh",
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
								justifyContent: "space-evenly",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							{dealtCards.map((card, idx) => {
								return (
									<div
										key={idx}
										className="tarotCard"
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											flexDirection: "column",
											textAlign: "center",
											border: "1px solid white",
											padding: "10px",
											width: "25vw",
											minWidth: "200px",
											maxWidth: "300px",
											height: "425px",
											color: " black",
											backgroundColor: "white",
											borderRadius: "25px",
											margin: "15px 30px",
											boxShadow:
												"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
										}}
									>
										<TarotCard card={card} />
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

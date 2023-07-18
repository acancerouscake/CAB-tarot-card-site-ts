import React, {useEffect, useState} from "react";
import {CardType, CardResponse, CardJSONImageType, CardsJSON} from "../types/types";
import TarotCard from "./TarotCard";
import Loading from "./Loading";
import * as TarotImages from "../json/tarot-images.json";

export default function Home() {
	const cardSpreadVals = ["3", "6", "10", "12"];
	const [numberOfCards, setNumberOfCards] = useState<number>();
	const [tarotCards, setTarotCards] = useState<CardType[]>([]);
	const [loading, setIsLoading] = useState<boolean>(false);
	const {cards} = TarotImages as CardsJSON;

	console.log(cards);

	const getImagesForCards = (ApiCardData: CardType[]) => {
		ApiCardData.forEach((cardAPI) => {
			cards.forEach((cardJSON) => {
				if (cardAPI.name === cardJSON.name) {
					return (cardAPI.img = cardJSON.img);
				}
			});
			setTarotCards(ApiCardData);
		});
	};

	const fetchCards = async (noOfCards: number) => {
		setIsLoading(true);
		setTarotCards([]);
		if (noOfCards) {
			try {
				const response = await fetch(
					`https://tarot-api-3hv5.onrender.com/api/v1/cards/random?n=${noOfCards}`
				);
				const data = (await response.json()) as CardResponse;
				getImagesForCards(data.cards);

				setIsLoading(false);
			} catch (e) {
				console.log("error :>> ", e);
				setIsLoading(false);
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
					tarotCards.map((card) => {
						return (
							<div key={card.value_int}>
								<TarotCard card={card} />
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}

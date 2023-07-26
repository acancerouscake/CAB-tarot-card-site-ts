import React, {useContext, useEffect, useState} from "react";
import {CardType, CardResponse, CardsJSON} from "../../types/types";
import TarotCard from "./TarotCard";
import Loading from "../Loading";
import {AuthContext} from "../../contexts/AuthContext";
import "./cardStyles.css";

//TODO: Fix styling issue with  cards  and navbar, fix issue with cards not getting reshuffled on click of button

export default function Cards() {
	const {tarotCards, loading} = useContext(AuthContext);

	const cardSpreadVals = ["3", "6", "10", "12"];
	const [numberOfCards, setNumberOfCards] = useState<number>();
	const [tCards, setTCards] = useState<CardType[]>([]);
	const [dealtCards, setDealtCards] = useState<CardType[]>([]);

	const dealCards = (noOfCards: number) => {
		setDealtCards([]);
		setNumberOfCards(0);
		const tmpArr: CardType[] = [];
		for (let i = 0; i < noOfCards; i++) {
			tmpArr.push(tarotCards[i] as CardType);
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
		if (tarotCards.length > 1) {
			setTCards(tarotCards as CardType[]);
		}
		if (numberOfCards && numberOfCards > 0) {
			dealCards(numberOfCards);
		}
	}, [numberOfCards, tarotCards]);

	return (
		<div className="componentContainer">
			<h1>Cards </h1>
			<div className="cardsButtonsLoadingContainer">
				{loading ? (
					<Loading />
				) : (
					<>
						<div className="cardsButtonsContainer">
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

						<div className="cardResultContainer">
							{dealtCards.map((card, idx) => {
								return (
									<div key={idx} className="tarotCard">
										<TarotCard card={card} />
									</div>
								);
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

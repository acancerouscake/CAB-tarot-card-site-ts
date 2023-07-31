import React, {useContext, useEffect, useState, useCallback} from "react";
import {CardType} from "../../types/types";
import TarotCard from "./TarotCard";
import Loading from "../Loading";
import {AuthContext} from "../../contexts/AuthContext";
import "./cardStyles.css";

export default function Cards() {
	const {tarotCards, loading} = useContext(AuthContext);

	const cardSpreadVals = [1, 3, 5, 6, 7];
	const [numberOfCards, setNumberOfCards] = useState<number>(0);
	const [dealtCards, setDealtCards] = useState<CardType[]>([]);

	const dealCards = useCallback(
		(noOfCards: number) => {
			setDealtCards([]);
			// Check if tarotCards is a valid array of CardType
			if (!Array.isArray(tarotCards)) {
				console.error("Invalid tarotCards in context.");
				return;
			}

			// Shuffle the cards in the copyTarotCards array
			for (let i = tarotCards.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[tarotCards[i], tarotCards[j]] = [tarotCards[j], tarotCards[i]];
			}
			// Update the dealtCards state with the shuffled cards
			setDealtCards(tarotCards.slice(0, noOfCards));
		},
		[tarotCards]
	);

	useEffect(() => {
		if (numberOfCards && numberOfCards > 0) {
			dealCards(numberOfCards);
		}
	}, [numberOfCards, tarotCards, dealCards]);

	const handleButtonClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			const buttonVal = parseInt((e.target as HTMLButtonElement).value);
			setNumberOfCards(buttonVal);
		},
		[]
	);

	return (
		<div className="componentContainer">
			<h1>Cards </h1>
			<div className="cardsButtonsLoadingContainer">
				{loading ? (
					<Loading />
				) : (
					<>
						<div className="cardsButtonsContainer">
							{cardSpreadVals.map((spreadVal) => (
								<button
									onClick={handleButtonClick}
									className={"button-5"}
									name={`${spreadVal} Cards`}
									value={spreadVal}
									key={spreadVal}
								>
									{`${spreadVal}`} Cards
								</button>
							))}
						</div>

						<div className="cardResultContainer">
							{dealtCards.map((card, idx) => {
								return (
									<React.Fragment key={idx}>
										<TarotCard
											card={card}
											num={dealtCards.length}
											idx={idx}
										/>
									</React.Fragment>
								);
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

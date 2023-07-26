import React, {useContext, useEffect, useState, useCallback} from "react";
import {CardType} from "../../types/types";
import TarotCard from "./TarotCard";
import Loading from "../Loading";
import {AuthContext} from "../../contexts/AuthContext";
import "./cardStyles.css";

export default function Cards() {
	const {tarotCards, loading} = useContext(AuthContext);

	const cardSpreadVals = [1, 3, 5];
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

	const getTransformStyle = (index: number) => {
		let translateX = 1;
		const centerIndex = Math.floor(dealtCards.length / 2);
		const cardOffset = 10; // Adjust this value to control the fanning distance between cards
		const scale = 1 - 0.09 * Math.abs(index - centerIndex); // Adjust this value to control the scaling of cards
		const underlap = 100; // Adjust this value to control the underlap distance between alternate cards
		const yOffset = 2;
		const distanceFromCenter = Math.abs(index - centerIndex);
		let translateY = 0;

		//TODO: Tweak this function to get one layer deeper from the center index from dealtCards to adjust the Y axis further
		if (index < centerIndex) {
			// Cards under center index
			translateY = distanceFromCenter * yOffset;
		} else {
			// Cards above center index
			translateY = distanceFromCenter * yOffset;
		}

		const rotateX = (index - centerIndex) * cardOffset;
		const zIndex =
			index === centerIndex ? 50 : dealtCards.length - distanceFromCenter;

		translateX =
			index < centerIndex
				? (index - centerIndex) * cardOffset + underlap * (centerIndex - index)
				: (index - centerIndex) * cardOffset - underlap * (index - centerIndex);

		return {
			transform: `rotate(${rotateX}deg) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
			zIndex: zIndex,
			boxShadow:
				"rgba(50, 50, 93, 0.25) 0px 25px 500px -10px, rgba(0, 0, 0, 0.3) 0px 15px 30px -15px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
		};
	};

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
									name={`${spreadVal} Cards`}
									value={spreadVal}
									key={spreadVal}
								>
									{`${spreadVal}`} Cards
								</button>
							))}
						</div>

						<div className="cardResultContainer">
							{dealtCards.map((card, idx) => (
								<div
									key={idx}
									className={`tarotCard `}
									style={getTransformStyle(idx)}
								>
									<TarotCard card={card} />
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

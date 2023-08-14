import React, {useContext, useState, useCallback, useRef} from "react";
import {CardType} from "../../types/types";
import TarotCard from "./TarotCard";
import Loading from "../Loading";
import {TarotCardContext} from "../../contexts/TarotCardContext";
import styles from "./cardStyles.module.css";
import Chat from "../Chat/Chat";
import {AuthContextProvider} from "../../contexts/AuthContext";
import ProtectedLayout from "../ProtectedLayout";
import SegmentedControl from "../SegmentedControls/SegmentedControl";

export default function Cards() {
	const cardSpreadVals = [
		{
			label: "3",
			value: 3,
			ref: useRef(),
		},
		{
			label: "5",
			value: 5,
			ref: useRef(),
		},
		{
			label: "6",
			value: 6,
			ref: useRef(),
		},
		{
			label: "7",
			value: 7,
			ref: useRef(),
		},
	];
	const {tarotCards, loading} = useContext(TarotCardContext);
	// const cardSpreadVals = [1, 3, 5, 6, 7];
	const [numberOfCards, setNumberOfCards] = useState<number>(3);
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

	// useEffect(() => {
	// 	if (numberOfCards && numberOfCards > 0) {
	// 		dealCards(numberOfCards);
	// 	}
	// }, [numberOfCards, tarotCards, dealCards]);

	const handleButtonClick = useCallback(() => {
		dealCards(numberOfCards);
	}, [dealCards, numberOfCards]);

	return (
		<div className={styles.componentContainer}>
			<h1>Cards </h1>
			<div className={styles.cardsButtonsLoadingContainer}>
				<div>
					<SegmentedControl
						callback={(val) => setNumberOfCards(val)}
						defaultIndex={3}
						controlRef={useRef()}
						segments={cardSpreadVals}
					/>
				</div>

				{loading ? (
					<div>
						<Loading />
					</div>
				) : (
					<>
						<div className={styles.cardsButtonsContainer}>
							<button
								onClick={handleButtonClick}
								className={"button-5"}
								name={`Cards`}
							>
								Draw
							</button>
						</div>

						<div className={styles.cardResultContainer}>
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
						<>
							<AuthContextProvider>
								<ProtectedLayout>
									<Chat />
								</ProtectedLayout>
							</AuthContextProvider>
						</>
					</>
				)}
			</div>
		</div>
	);
}

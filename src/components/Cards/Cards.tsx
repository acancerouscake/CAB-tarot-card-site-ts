import React, {useContext, useState, useCallback, useRef, useMemo} from 'react';
import {CardType} from '../../types/types';
import TarotCard from './TarotCard';
import Loading from '../Loading';
import {TarotCardContext} from '../../contexts/TarotCardContext';
import styles from './cardStyles.module.css';
import Chat from '../Chat/Chat';
import {AuthContextProvider} from '../../contexts/AuthContext';
import ProtectedLayout from '../ProtectedLayout';
import SegmentedControl from '../SegmentedControls/SegmentedControl';
import Spinner from '../Spinner';

type DealtCardType = CardType & {meaning: string};

export default function Cards() {
	const cardRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

	const cardSpreadVals = useMemo(
		() => [
			{label: '3', value: 3, ref: cardRefs[0], meanings: ['Past', 'Present', 'Future']},
			{label: '5', value: 5, ref: cardRefs[1], meanings: ['Past', 'Present', 'Influences/Obstacles', 'Advice', 'Outcome']},
			{label: '6', value: 6, ref: cardRefs[2], meanings: ['Past', 'Present', 'Future', 'Cause', 'Advice', 'Outcome']},
			{label: '7', value: 7, ref: cardRefs[3], meanings: ['Past', 'Present', 'Future', 'Avoid', 'Focus', 'Advice', 'Outcome']},
		],
		[cardRefs]
	);

	const {tarotCards, loading} = useContext(TarotCardContext);
	const [numberOfCards, setNumberOfCards] = useState<number>(3);
	const [dealtCards, setDealtCards] = useState<DealtCardType[]>([]);

	const dealCards = useCallback(() => {
		if (!Array.isArray(tarotCards)) {
			console.error('Invalid tarotCards in context.');
			return;
		}
		const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
		const selectedSpread = cardSpreadVals.find((spread) => spread.value === numberOfCards);

		if (!selectedSpread) {
			console.error('Invalid spread selected');
			return;
		}

		const dealtCardsWithMeanings = shuffled.slice(0, numberOfCards).map((card, index) => ({
			...card,
			meaning: selectedSpread.meanings[index],
		}));

		setDealtCards(dealtCardsWithMeanings);
	}, [tarotCards, numberOfCards, cardSpreadVals]);

	const handleNumberOfCardsChange = useCallback((val: number) => {
		setNumberOfCards(val);
	}, []);

	// const renderControls = useCallback(
	// 	() => ,
	// 	[cardSpreadVals, handleNumberOfCardsChange, dealCards]
	// );

	return (
		<div className={styles.componentContainer}>
			<h1>Cards</h1>
			<div className={styles.cardsButtonsLoadingContainer}>
				{loading ? (
					<Loading />
				) : (
					<>
						<p className={styles.ptext}>How many cards would you like to draw?</p>

						<div className={styles.cardsButtonsContainer}>
							<SegmentedControl callback={handleNumberOfCardsChange} defaultIndex={3} segments={cardSpreadVals} />
							<button onClick={dealCards} className={styles.button7} name={`button-5`}>
								<p>Draw</p>
							</button>
						</div>
						<AuthContextProvider>
							<ProtectedLayout>
								<Chat />
							</ProtectedLayout>
						</AuthContextProvider>
					</>
				)}
			</div>
			<div className={styles.cardResultContainer}>
				{loading ? (
					<Spinner />
				) : (
					dealtCards.map((card, idx) => (
						<React.Fragment key={idx}>
							<TarotCard card={card} num={dealtCards.length} idx={idx} meaning={card.meaning} />
						</React.Fragment>
					))
				)}
			</div>
		</div>
	);
}

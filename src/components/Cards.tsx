import React, {useContext, useEffect, useState} from "react";
import {CardType, CardResponse, CardsJSON} from "../types/types";
import TarotCard from "./TarotCard";
import Loading from "./Loading";
import {AuthContext} from "../contexts/AuthContext";

export default function Cards() {
	const {tarotCards, loading} = useContext(AuthContext);

	const cardSpreadVals = ["3", "6", "10", "12"];
	const [numberOfCards, setNumberOfCards] = useState<number>();
	const [tCards, setTarotCards] = useState<CardType[]>([]);
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
			setTarotCards(tarotCards as CardType[]);
		}
		console.log("cards :>> ", tCards);
		if (numberOfCards && numberOfCards > 0) {
			dealCards(numberOfCards);
		}
	}, [numberOfCards, tarotCards]);

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

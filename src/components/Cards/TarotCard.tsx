import React, {useState} from "react";
import {CardType} from "../../types/types";

interface TarotCardProps {
	card: CardType;
	num: number;
	idx: number;
}

const TarotCard = ({card, num, idx}: TarotCardProps) => {
	const {name, type, meaning_up, img} = card;

	const [isHovered, setIsHovered] = useState(false);

	const getTransformStyle = (num: number, idx: number): React.CSSProperties => {
		const overHalf = num > (num - 1) / 2;
		const curl = Math.pow(num, 1) * 0.1;
		const deg = num > 1 ? -num * 5 : 0;
		let degs = deg / 2.1;
		const initialDown = num * 5;
		let down = initialDown / 2;
		const initialOver = curl;
		let over = initialOver / 2;

		if (num > 1) {
			degs -= deg / (num - 1);
			down -= initialDown / (num - 0.5);
			over -= initialOver / (num - 1);
		}

		const hoverTransform = `translateY(-50px)`;
		const baseTransform = `translateY(0px)
		}%)  translateX(${30 + over * -1}%) rotate(${degs}deg)`;
		//TODO: Figure out why rotation doesn't work, fix this
		return {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			textAlign: "center",
			border: " 1px solid black",
			padding: "5px",
			marginLeft: " -200px",
			width: "300px",
			height: "425px",
			color: "black",
			backgroundColor: "white",
			transform: isHovered ? hoverTransform : baseTransform,
			borderRadius: "25px",
			zIndex: idx,
			transition: "transform ease 0.2s",
		};
	};

	console.log(isHovered);
	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={getTransformStyle(num, idx)}
			key={idx}
		>
			<img src={img} style={{width: "100px"}} title={name}></img>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
					flexDirection: "row",
					textAlign: "center",
					width: "100%",
				}}
			>
				<p style={{fontSize: "14px"}}>{name}</p>
				<p style={{fontSize: "14px"}}>{type}</p>
			</div>
			{
				//fixes scaling text issue in fontSize
			}
			<p style={{fontSize: "min(.8vmax, 10px)"}}>{meaning_up}</p>
		</div>
	);
};
export default TarotCard;

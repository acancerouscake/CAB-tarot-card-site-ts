import React, {useState} from 'react';
import {CardType} from '../../types/types';
import TarotCardModal from './TarotCardModal';


interface TarotCardProps {
	card: CardType;
	num: number;
	idx: number;
	meaning: string;
}

const TarotCard = ({card, num, idx, meaning}: TarotCardProps) => {
	const {name, img} = card;

	const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleCardClick = () => {
		setIsModalOpen(true);
		setSelectedCard(card);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedCard(null);
	};

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	React.useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [windowWidth]);

	const getTransformStyle = (num: number, idx: number): React.CSSProperties => {
		const angle = (idx - (num - 1) / 2) * 10;
		const translateX = (idx - (num - 1) / 2) * (windowWidth < 768 ? -50.1 : 20);
		const translateY = Math.abs(idx - (num - 1) / 2) * 10;

		const hoverTransform = `translateY(${translateY - 20}px) translateX(${translateX}px) rotate(${angle}deg)`;
		const baseTransform = `translateY(${translateY}px) translateX(${translateX}px) rotate(${angle}deg)`;

		return {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-around',
			flexDirection: 'column',
			textAlign: 'center',
			border: '1px solid black',
			marginLeft: windowWidth < 768 ? '-130px' : '-200px',
			width: windowWidth < 768 ? '200px' : '270px',
			color: 'black',
			backgroundColor: 'white',
			transform: isHovered && !isModalOpen ? hoverTransform : baseTransform,
			borderRadius: '25px',
			zIndex: idx,
			transition: 'transform ease 0.7s',
			cursor: 'pointer',
			boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
		};
	};

	return selectedCard ? (
		<TarotCardModal card={card} isModalOpen={isModalOpen} idx={idx} num={num} onClose={handleCloseModal} meaning={meaning} />
	) : (
		<div onMouseEnter={() => setIsHovered(!isModalOpen)} onMouseLeave={() => setIsHovered(false)} style={getTransformStyle(num, idx)} key={idx} onClick={handleCardClick}>
			<h3
				style={{
					fontSize: '24px',
					fontWeight: 400,
					height: '0px',
					boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
				}}>
				{meaning}
			</h3>
			<h2
				style={{
					fontSize: '30px',
					letterSpacing: '5px',
					fontWeight: 400,
					lineHeight: '1',
					height: '5px',
				}}>
				{name}
			</h2>
			<img src={img} style={{width: '180px'}} title={name} alt={name} />
		</div>
	);
};

export default TarotCard;

import {CardType} from '../../types/types';
import styles from './cardStyles.module.css';

interface TarotCardProps {
	card: CardType | null;
	onClose: () => void;
	isModalOpen: boolean;
	num: number;
	idx: number;
	meaning: string;
}

const TarotCardModal = ({card, onClose, meaning}: TarotCardProps) => {
	const {name, type, desc, img} = card as CardType;

	return (
		<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
			<div
				onClick={onClose}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					flexDirection: 'row',
					textAlign: 'center',
					width: '100vw',
					cursor: 'zoom-out',
				}}>
				<img
					src={img}
					style={{
						border: '20px white  solid',
						borderRadius: '15px',
						width: '20vw',
					}}
					title={name}></img>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						flexDirection: 'column',
						textAlign: 'center',
						width: '50vw',
					}}>
					<h2
						style={{
							fontSize: '34px',
							letterSpacing: '8px',
							textDecoration: 'underline',
						}}>
						{name}
					</h2>
					<p style={{fontSize: '22px'}}>Arcana {type}</p>
					<p style={{fontSize: 'min(2vmax, 24px)', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)'}}>{desc}</p>
					<p style={{fontSize: 'min(2vmax, 22px)', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)'}}>Meaning: {meaning}</p>
				</div>

				<button className="button-5" style={{top: 10, right: 10, position: 'absolute', cursor: 'pointer'}} onClick={onClose}>
					X
				</button>
			</div>
		</div>
	);
};

export default TarotCardModal;

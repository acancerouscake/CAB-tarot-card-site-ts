import React, {useState, useEffect, useRef} from 'react';
import styles from './segments.module.css';

interface Segment {
	label: string;
	value: number;
}

interface SegmentedControlProps {
	segments: Segment[];
	callback: (value: number, index: number) => void;
	defaultIndex?: number;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({segments, callback, defaultIndex = 3}) => {
	const [componentReady, setComponentReady] = useState(false);
	const controlRef = useRef<HTMLDivElement>(null);
	const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [activeIndex, setActiveIndex] = useState(defaultIndex);

	const onInputChange = (value: number, index: number) => {
		setActiveIndex(index);
		callback(value, index);
	};

	useEffect(() => {
		if (controlRef.current && segmentRefs.current[activeIndex]) {
			const activeSegment = segmentRefs.current[activeIndex];
			if (activeSegment) {
				const {offsetWidth, offsetLeft} = activeSegment;
				controlRef.current.style.setProperty('--highlight-width', `${offsetWidth}px`);
				controlRef.current.style.setProperty('--highlight-x-pos', `${offsetLeft}px`);
			}
		}
	}, [activeIndex]);

	useEffect(() => {
		setComponentReady(true);
	}, []);

	return (
		<div className={styles.controlsContainer} ref={controlRef}>
			<div className={`${styles.controls} ${componentReady ? 'ready' : 'idle'}`}>
				{segments.map((item, i) => (
					<div key={item.value} className={`${styles.segment} ${i === activeIndex ? styles.active : styles.inactive}`} ref={(el) => (segmentRefs.current[i] = el)}>
						<input type="radio" value={item.value} id={item.label} onChange={() => onInputChange(item.value, i)} checked={i === activeIndex} />
						<label htmlFor={item.label}>{item.label}</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default SegmentedControl;

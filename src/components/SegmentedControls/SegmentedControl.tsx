import {useState, useEffect, MutableRefObject, LegacyRef} from "react";
import styles from "./segments.module.css";

interface Segment {
	label: string;
	value: number;
	ref: MutableRefObject<HTMLDivElement | undefined>;
}

interface SegmentedControlType {
	segments: Segment[];
	callback: (value: number, index: number) => void;
	defaultIndex?: number;
	controlRef: MutableRefObject<HTMLDivElement | undefined>;
}

const SegmentedControl = ({
	segments,
	callback,
	defaultIndex = 3,
	controlRef,
}: SegmentedControlType) => {
	const [activeIndex, setActiveIndex] = useState(defaultIndex);
	const [componentReady, setComponentReady] = useState<boolean>(false);
	const onInputChange = (value: number, index: number) => {
		setActiveIndex(index);
		callback(value, index);
	};

	useEffect(() => {
		if (componentReady) {
			const activeSegmentRef = segments[activeIndex].ref;
			if (activeSegmentRef.current) {
				const {offsetWidth, offsetLeft} = activeSegmentRef.current;
				const {style} = controlRef.current!;
				style.setProperty("--highlight-width", `${offsetWidth}px`);
				style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
			}
		}
	}, [activeIndex, callback, segments, controlRef, componentReady]);

	useEffect(() => {
		setComponentReady(true);
	}, []);

	return (
		<div
			className={styles.controlsContainer}
			ref={controlRef as LegacyRef<HTMLDivElement>}
		>
			<p>How many cards would you like to draw?</p>
			<div className={`${styles.controls} ${componentReady ? "ready" : "idle"}`}>
				{segments.map((item, i) => (
					<div
						key={item.value}
						className={`${styles.segment} ${
							i === activeIndex ? styles.active : styles.inactive
						}`}
						ref={item.ref as LegacyRef<HTMLDivElement>}
					>
						<input
							type="radio"
							value={item.value}
							id={item.label}
							onChange={() => onInputChange(item.value, i)}
							checked={i === activeIndex}
						/>
						<label htmlFor={item.label}>{item.label}</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default SegmentedControl;

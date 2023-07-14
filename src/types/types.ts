export interface CardType {
	type: string;
	name_short: string;
	name: string;
	value: string;
	value_int: number;
	meaning_up: string;
	meaning_rev: string;
	desc: string;
	suit?: string;
}

export interface CardResponse {
	nhits: number;
	cards: CardType[];
}

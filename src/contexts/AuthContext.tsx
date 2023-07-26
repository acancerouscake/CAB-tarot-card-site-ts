import {createContext, useEffect, useState} from "react";
import {CardResponse, CardType, CardsJSON, User} from "../types/types";
import * as TarotImages from "../json/tarot-images.json";

export interface ContextType {
	user: User | "No provider";
	tarotCards: CardType[] | "No provider";
	loading: boolean;
	login: () => void;
	logout: () => void;
}

const defaultValue: ContextType = {
	user: "No provider",
	tarotCards: "No provider",
	loading: false,
	login: () => {
		throw Error("No provider");
	},
	logout: () => {
		throw Error("No provider");
	},
};

export const AuthContext = createContext(defaultValue);

interface Props {
	children: React.ReactNode;
}

export const AuthContextProvider = (props: Props) => {
	const {cards} = TarotImages as CardsJSON;
	const [user, setUser] = useState(false);
	const [tarotCards, setTarotCards] = useState<CardType[]>([]);
	const [loading, setIsLoading] = useState(false);

	const fetchCards = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`https://tarot-api-3hv5.onrender.com/api/v1/`);
			const data = (await response.json()) as CardResponse;
			getImagesForCards(data.cards);
		} catch (e) {
			console.log("error :>> ", e);
			setIsLoading(false);
		}
	};
	const getImagesForCards = (apiCardData: CardType[]) => {
		apiCardData.forEach((cardAPI) => {
			cards.forEach((cardJSON) => {
				if (cardAPI.name === cardJSON.name) {
					return (cardAPI.img = cardJSON.img);
				}
			});
		});
		randomizeCards(apiCardData);
	};

	const randomizeCards = (cardsArg: CardType[]) => {
		for (let i = cardsArg.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[cardsArg[i], cardsArg[j]] = [cardsArg[j], cardsArg[i]];
		}
		setTarotCards(cardsArg);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchCards().catch((e) => {
			console.log("e :>> ", e);
		});
	}, []);

	const login = () => {
		setUser(true);
	};

	const logout = () => {
		setUser(false);
	};

	return (
		<AuthContext.Provider value={{user, tarotCards, loading, login, logout}}>
			{props.children}
		</AuthContext.Provider>
	);
};

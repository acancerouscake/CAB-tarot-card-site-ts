import {useContext, useEffect, useState, MouseEvent} from "react";
import styles from "./chat.module.css";
import {ChatMsg, ChatMsgWithId} from "../../types/types";
import {AuthContext} from "../../contexts/AuthContext";
import {addDoc, collection, getDocs, orderBy, query} from "firebase/firestore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {db} from "../../firebaseConfig";
//import the css here

export const Chat = () => {
	const hide = {
		display: "none",
	};
	const show = {
		display: "block",
	};
	const {user} = useContext(AuthContext);

	const [inputValue, setInputValue] = useState("");
	const [chatopen, setChatopen] = useState(false);
	const [existingMessages, setExistingMessages] = useState<ChatMsgWithId[]>([]);

	const handleSubmit = async (e: MouseEvent<SVGSVGElement>) => {
		setExistingMessages([]);
		e.preventDefault();
		const newMessage: ChatMsg = {
			author: user!.email as string,
			date: Date.now(),
			text: inputValue,
		};
		console.log(newMessage);
		// console.log("my message", newMessage);
		try {
			const docRef = await addDoc(collection(db, "chat"), newMessage);
			console.log("Document written with ID: ", docRef.id);
			setInputValue("");

			const msgToAdd: ChatMsgWithId = {
				...newMessage,
				id: docRef.id,
			};
			setExistingMessages([...existingMessages, msgToAdd]);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const getChats = async () => {
			const q = query(collection(db, "chat"), orderBy("date"));
			const snapshot = await getDocs(q);
			// console.log(snapshot); // to see the whole object
			const chatArray: ChatMsgWithId[] = [];
			snapshot.forEach((doc) => {
				const data = doc.data() as ChatMsg;
				chatArray.push({...data, id: doc.id}); // id exists on the doc before using .data(), I use a spread operator to push them into a single object
			});
			setExistingMessages(chatArray);
		};
		getChats().catch((e) => console.log(e));
	}, []);

	return (
		<div id={styles.chatCon}>
			<div className={styles.chatBox} style={chatopen ? show : hide}>
				<div className={styles.header}>Chat with me</div>
				<div className={styles.msgsSubmitArea}>
					<div className={styles.msgArea}>
						{existingMessages.map((msg) => {
							const timestamp = msg.date;
							const timestampSeconds = timestamp / 1000;
							const dateObject = new Date(timestampSeconds);
							const formattedDate = dateObject.toUTCString();

							return (
								<div key={msg.id} className={styles.msgStyle}>
									<div
										style={{
											justifyContent: "center",
											display: "flex",
											alignItems: "center",
											gap: "5px",
											height: "15px",
											padding: "5px",
										}}
									>
										<h5>-{msg.author}-</h5>
										<i> : {formattedDate}</i>
									</div>
									<p>{msg.text}</p>
								</div>
							);
						})}
					</div>
					<div className={styles.footer}>
						<textarea
							placeholder="write a message!"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<FontAwesomeIcon
							icon={faPaperPlane}
							onClick={(e) => void handleSubmit(e)}
							style={{width: "35px", height: "35px", cursor: "pointer"}}
						/>
					</div>
				</div>
			</div>
			<div className={styles.pop}>
				<p>
					<img
						onClick={() => setChatopen(!chatopen)}
						src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg"
						alt=""
					/>
				</p>
			</div>
		</div>
	);
};

export default Chat;

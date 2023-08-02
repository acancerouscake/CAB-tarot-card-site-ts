import React, {LegacyRef, useState} from "react";
import styles from "./chat.module.css";
//import the css here

interface Props {
	messages: string[];
	getMessage: () => void;
}

export const Chat = (props: Props) => {
	const hide = {
		display: "none",
	};
	const show = {
		display: "block",
	};
	const textRef: LegacyRef<HTMLInputElement> | undefined = React.createRef();
	const {messages, getMessage} = props;

	const [chatopen, setChatopen] = useState(false);

	const handleSend = (e) => {
		//@ts-ignore
		getMessage(textRef.current.value);
	};

	return (
		<div id={styles.chatCon}>
			<div className={styles.chatBox} style={chatopen ? show : hide}>
				<div className={styles.header}>Chat with me</div>
				<div className={styles.msgArea}>
					{messages.map((msg, idx) =>
						idx % 2 ? (
							<React.Fragment key={idx}>
								<p className={styles.right}>
									<span>{msg}</span>
								</p>
							</React.Fragment>
						) : (
							<React.Fragment key={idx}>
								<p className={styles.left}>
									<span>{msg}</span>
								</p>
							</React.Fragment>
						)
					)}
				</div>
				<div className={styles.footer}>
					<input type="text" ref={textRef} />
					<button
						onClick={(e) => {
							return e;
						}}
					>
						<i className={"fa fa-paper-plane"}></i>
					</button>
				</div>
			</div>
			<div className={styles.pop}>
				<p>
					<img
						onClick={(e) => setChatopen(!chatopen)}
						src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg"
						alt=""
					/>
				</p>
			</div>
		</div>
	);
};

export default Chat;

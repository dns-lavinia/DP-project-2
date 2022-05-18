import TextField from "components/common/TextField"
import { useState } from "react";
import { postMessage } from "services/chat";
import { IMessage } from "types/game";
import Message from "./Message"

interface ChatProps {
    messages: IMessage[];
}

export default function Chat({ messages }: ChatProps) {
    const [message, setMessage] = useState("");

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const msg = {
                image: "https://cdn.discordapp.com/attachments/264502274032664587/962125258972889179/unknown.png",
                name: "Thotu3",
                message: message,
                time: new Date().toLocaleString()
            }

            setMessage("");
            postMessage(msg)
                .then(() => {})
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-end">
            <div className="flex flex-col p-2 gap-2">
                {messages.map(({image, name, message}, index) => (
                    <Message 
                        key={index}
                        image={image}
                        name={name}
                        message={message}
                    />
                ))}
            </div>
            <div className="p-2">
                <TextField
                    value={message}
                    onChange={setMessage}
                    type="text"
                    placeholder="Type a message..."
                    onKeyDown={handleEnter}
                />
            </div>
        </div>
    )
}
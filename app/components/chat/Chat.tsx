import TextField from "components/common/TextField"
import { useUser } from "contexts/UserContext";
import { Router } from "next/router";
import { useState, useEffect } from "react";
import { getMessages, postMessage } from "services/chat";
import { IMessage } from "types/game";
import Message from "./Message"

export default function Chat() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [message, setMessage] = useState("");
    const [messagePing, setMessagePing] = useState(0);
    const { user } = useUser();

    
    useEffect(() => {
        getMessages()
            .then(res => {
                const msgs: IMessage[] = res.data;
                setMessages(msgs.slice(-17));
                setTimeout(() => {
                    setMessagePing(messagePing + 1);
                }, 2000)

            })
            .catch(err => console.log(err));
    }, [messagePing])

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (message.trim().length === 0) return;

            const msg = user ? {
                image: user.photoURL ?? undefined,
                name: user.displayName ?? 'Anonymous',
                message: message,
                time: new Date().toLocaleString()
            } : {
                image: undefined,
                name: 'Anonymous',
                message: message,
                time: new Date().toLocaleString()
            }

            setMessages([...messages, msg]);
            setMessage("");
            postMessage(msg)
                .then(() => {
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-end">
            <div className="flex flex-col p-2 gap-2">
                {messages.map(({image, name, message, time}, index) => (
                    <Message 
                        key={index}
                        image={image}
                        name={name}
                        message={message}
                        time={time}
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
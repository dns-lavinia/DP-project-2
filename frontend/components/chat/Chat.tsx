import TextField from "components/common/TextField"
import { useState } from "react";
import Message from "./Message"

interface ChatProps {

}

export default function Chat({}: ChatProps) {
    const [message, setMessage] = useState("");

    const messages = [
        {
            image: "https://cdn.discordapp.com/attachments/264502274032664587/962125258972889179/unknown.png",
            name: "Thotu3",
            message: "Buna.Ziua.Domnule.Buenis"
        }, 
        {
            image: "https://cdn.discordapp.com/attachments/326096661355167754/962101913388711986/fuowhfuidhfuiqhfuiwhfiuehfuwufwhfuhwiufhweufwgfuighj.jpg",
            name: "Buenis",
            message: "Hello this is some real nice cruce shit"
        }
    ]

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setMessage("");
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